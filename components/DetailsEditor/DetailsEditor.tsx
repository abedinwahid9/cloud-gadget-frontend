"use client";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./detailseditor.css";

const DetailsEditor = () => {
  const [value, setValue] = useState("");
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
        value={value}
        onChange={setValue}
        className=" text-secondary "
      />
    </div>
  );
};
export default DetailsEditor;
