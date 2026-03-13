export async function updateTags(blogId: string, tags: string[]) {
  const res = await fetch(
    `${import.meta.env.PUBLIC_ENDPOINT}/igposts?id=${blogId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update tags");
  }

  return res.json();
}
