import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma/client";
import { supabase } from "../submissions/server"; // keep storage for signature files

function base64ToBuffer(base64: string) {
  const data = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(data, "base64");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { proposalId, signatureBase64 } = await request.json();

    if (!proposalId || !signatureBase64) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    // 🔒 1. Fetch proposal
    const proposal = await prisma.proposals.findUnique({
      where: { passcode: proposalId },
      select: { passcode: true, stage: true },
    });

    if (!proposal) {
      return new Response(JSON.stringify({ error: "Proposal not found" }), {
        status: 404,
      });
    }

    if (proposal.stage === "accepted") {
      return new Response(
        JSON.stringify({ error: "Proposal already signed" }),
        { status: 409 }
      );
    }

    // 📂 2. Check if signature already exists
    const folderPath = `proposal-${proposalId}`;
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("signatures_bucket")
      .list(folderPath);

    if (listError) {
      console.error(listError);
      return new Response(
        JSON.stringify({ error: "Failed to check existing signature" }),
        { status: 500 }
      );
    }

    const alreadySigned = existingFiles?.some(
      (file) => file.name === "signature.png"
    );
    if (alreadySigned) {
      return new Response(
        JSON.stringify({ error: "Signature already exists" }),
        { status: 409 }
      );
    }

    // 🖼 3. Upload signature
    const buffer = base64ToBuffer(signatureBase64);
    const filePath = `${folderPath}/signature.png`;

    const { error: uploadError } = await supabase.storage
      .from("signatures_bucket")
      .upload(filePath, buffer, { contentType: "image/png", upsert: false });

    if (uploadError) {
      console.error(uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload signature" }),
        { status: 500 }
      );
    }

    // 🌍 4. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("signatures_bucket")
      .getPublicUrl(filePath);

    // 🗃 5. Update proposal using Prisma
    await prisma.proposals.update({
      where: { passcode: proposalId },
      data: {
        signature_url: publicUrlData.publicUrl,
        signed_at: new Date(),
        stage: "accepted",
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        signatureUrl: publicUrlData.publicUrl,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /sign-proposal] Prisma error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
