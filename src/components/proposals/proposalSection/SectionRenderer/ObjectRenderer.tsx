// import { useState } from "react";
// import { Trash2 } from "lucide-react";

// export default function ObjectRenderer({ data, setData, isEditing }: any) {
//   const [newKey, setNewKey] = useState("");
//   const [newValue, setNewValue] = useState("");

//   const updateField = (key: string, value: string) => {
//     setData({
//       ...data,
//       [key]: value,
//     });
//   };

//   const deleteField = (key: string) => {
//     const obj = { ...data };
//     delete obj[key];
//     setData(obj);
//   };

//   const addField = () => {
//     if (!newKey) return;

//     setData({
//       ...data,
//       [newKey]: newValue,
//     });

//     setNewKey("");
//     setNewValue("");
//   };

//   return (
//     <div className="space-y-4 text-background ">
//       {Object.entries(data || {}).map(([key, value]) => (
//         <div key={key}>
//           <h3 className="text-sm font-semibold text-primary">{key}</h3>

//           {isEditing ? (
//             <div className="flex gap-2 items-center">
//               <input
//                 className="mt-1 w-full  p-2"
//                 value={(value as string) || ""}
//                 onChange={(e) => updateField(key, e.target.value)}
//               />

//               <button
//                 type="button"
//                 onClick={() => deleteField(key)}
//                 className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           ) : (
//             <p>{value as string}</p>
//           )}
//         </div>
//       ))}

//       {isEditing && (
//         <div className="flex gap-2 pt-4 border-t">
//           <input
//             placeholder="Field name"
//             className=" border p-2 w-1/3"
//             value={newKey}
//             onChange={(e) => setNewKey(e.target.value)}
//           />

//           <input
//             placeholder="Value"
//             className=" border p-2 w-full"
//             value={newValue}
//             onChange={(e) => setNewValue(e.target.value)}
//           />

//           <button
//             type="button"
//             onClick={addField}
//             className="px-3 py-2 bg-primary text-primary-foreground rounded-md"
//           >
//             Add
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
