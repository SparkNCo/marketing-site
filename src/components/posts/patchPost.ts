export async function patchIgPost(blogId: string, updates: Record<string, any>) {
  const res = await fetch(
    `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
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