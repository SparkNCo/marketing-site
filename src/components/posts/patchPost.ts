import { supabaseFunctionsUrl } from "../../lib/supabaseFunctionsUrl";

export async function patchIgPost(blogId: string, updates: Record<string, any>) {
  const res = await fetch(
    `${supabaseFunctionsUrl("igposts")}?id=${encodeURIComponent(blogId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
}