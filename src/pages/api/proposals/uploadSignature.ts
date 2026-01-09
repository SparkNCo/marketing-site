import type { APIRoute } from "astro";
import { supabase } from "../submissions/server";

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

    // 🔒 1. Fetch proposal (FIX: include stage)
    const { data: proposal, error: proposalError } = await supabase
      .from("proposals")
      .select("passcode, stage")
      .eq("passcode", proposalId)
      .single();

    if (proposalError || !proposal) {
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

    // 📂 2. Check if signature already exists (NEW)
    const folderPath = `proposal-${proposalId}`;

    const { data: existingFiles, error: listError } =
      await supabase.storage
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

    // 🖼 3. Upload signature (FIX: upsert false)
    const buffer = base64ToBuffer(signatureBase64);
    const filePath = `${folderPath}/signature.png`;

    const { error: uploadError } = await supabase.storage
      .from("signatures_bucket")
      .upload(filePath, buffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload signature" }),
        { status: 500 }
      );
    }

    // 🌍 4. Get public URL (FIX: correct bucket)
    const { data: publicUrlData } = supabase.storage
      .from("signatures_bucket")
      .getPublicUrl(filePath);

    // 🗃 5. Update proposal
    const { error: updateError } = await supabase
      .from("proposals")
      .update({
        signature_url: publicUrlData.publicUrl,
        signed_at: new Date().toISOString(),
        stage: "accepted",
      })
      .eq("passcode", proposalId);

    if (updateError) {
      console.error(updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update proposal" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        signatureUrl: publicUrlData.publicUrl,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
