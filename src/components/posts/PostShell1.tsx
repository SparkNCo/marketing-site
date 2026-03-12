import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../lib/tanStack";
import SquaresPostLayout from "./SquaresPostLayout";
import { PostFooter1 } from "./PostFooter";
import { fetchPost } from "./PostShell";
import { useEffect, useRef, useState } from "react";

// export default function PostShell1(props) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <PostContent {...props} />
//     </QueryClientProvider>
//   );
// }

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

// function PostContent({ blog, squaresConfig, edit }) {
//   const [saving, setSaving] = useState(false);

//   const {
//     data: uniquePost,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["post", blog],
//     queryFn: () => fetchPost(blog),
//     enabled: !!blog,
//   });

//   const [postData, setPostData] = useState(null);

//   useEffect(() => {
//     if (uniquePost) {
//       setPostData(uniquePost);
//     }
//   }, [uniquePost]);

//   if (!postData) return null;

//   const handleFooterChange = (field, value) => {
//     setPostData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleTagsChange = (newTags) => {
//     setPostData((prev) => ({
//       ...prev,
//       tags: newTags,
//     }));
//   };

//   const tags = [
//     {
//       labels: postData.tags || [],
//       x: "20px",
//       y: "1020px",
//     },
//   ];

//   const onSave = async () => {
//     console.log("Manual save:", postData);
//   };
//   return (
//     <div className="max-w-[1080px] mx-auto">
//       <SquaresPostLayout
//         squares={squaresConfig}
//         tags={tags}
//         edit={edit}
//         onTagsChange={handleTagsChange}
//         onSave={() => onSave()}
//         saving={saving}
//       >
//         <div className="layout title-foreground">
//           <article>
//             <div
//               className="h-[1080px] bg-cover bg-center relative"
//               style={{ backgroundImage: `url(${postData.img})` }}
//             />
//           </article>
//         </div>
//       </SquaresPostLayout>

//       <PostFooter1
//         title={postData.title}
//         author={postData.author}
//         edit={edit}
//         onChange={handleFooterChange}
//       />
//     </div>
//   );
// }
