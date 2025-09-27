"use client";
import "react-quill-new/dist/quill.snow.css";
import "./detailseditor.css";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const DetailsEditor = () => {
  const { setValue } = useFormContext();

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
        // value={value}
        onChange={(val) => {
          setValue("description", val);
        }}
        className=" text-secondary "
      />
    </div>
  );
};
export default DetailsEditor;
