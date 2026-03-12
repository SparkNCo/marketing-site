export async function updatePost(blogId, data) {
  const res = await fetch(`/api/posts/${blogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Update failed: ${text}`);
  }

  return res.json();
}
