// import { Trash2 } from "lucide-react";

// export default function ArrayStringRenderer({ data, setData, isEditing }: any) {
//   const updateItem = (index: number, value: string) => {
//     const arr = [...data];
//     arr[index] = value;
//     setData(arr);
//   };

//   const deleteItem = (index: number) => {
//     const arr = [...data];
//     arr.splice(index, 1);
//     setData(arr);
//   };

//   const addItem = () => {
//     setData([...(data || []), ""]);
//   };

//   return (
//     <div className="">
//       <ul className="list-disc space-y-2 pl-6 text-background">
//         {data.map((item: string, i: number) => (
//           <li key={i} className="flex gap-2 items-center">
//             {isEditing ? (
//               <>
//                 <input
//                   className="w-full  p-2"
//                   value={item}
//                   onChange={(e) => updateItem(i, e.target.value)}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => deleteItem(i)}
//                   className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               </>
//             ) : (
//               item
//             )}
//           </li>
//         ))}
//       </ul>

//       {isEditing && (
//         <button
//           type="button"
//           onClick={addItem}
//           className="mt-3 text-sm text-primary hover:underline"
//         >
//           + Add Item
//         </button>
//       )}
//     </div>
//   );
// }
