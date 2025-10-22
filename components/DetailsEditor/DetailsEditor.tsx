"use client";
import "react-quill-new/dist/quill.snow.css";
import "./detailseditor.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const DetailsEditor = ({ ...props }) => {
  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", { color: [] }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="dark:bg-white">
      <ReactQuill
        modules={modules}
        theme="snow"
        {...props}
        className=" text-secondary "
      />
    </div>
  );
};
export default DetailsEditor;

// "use client";
// import "react-quill-new/dist/quill.snow.css";
// import "./detailseditor.css";
// import { Controller, useFormContext } from "react-hook-form";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const DetailsEditor = () => {
//   const { control } = useFormContext();

//   const toolbarOptions = [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     [{ color: [] }],
//     ["clean"],
//   ];

//   const modules = { toolbar: toolbarOptions };

//   return (
//     <div className="dark:bg-white rounded-lg">
//       <Controller
//         name="description"
//         control={control}
//         defaultValue=""
//         rules={{ required: true }}
//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <ReactQuill
//               theme="snow"
//               modules={modules}
//               value={field.value || ""}
//               onChange={field.onChange}
//               className="text-secondary"
//             />

//             )
//             {error && (
//               <p className="text-red-500 text-sm mt-1">{error.message}</p>
//             )}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default DetailsEditor;
