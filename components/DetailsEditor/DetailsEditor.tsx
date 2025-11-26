"use client";
import "react-quill-new/dist/quill.snow.css";
import "./detailseditor.css";
import dynamic from "next/dynamic";
import { DeltaStatic } from "react-quill-new";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const DetailsEditor = ({ ...props }) => {
  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image"],
    [{ color: [] }],
    ["clean"],
  ];

  const cleanDelta = (node: Node, delta: DeltaStatic): DeltaStatic => {
    delta.ops?.forEach((op) => {
      if (op.attributes) {
        delete op.attributes.background;
        delete op.attributes.color;
        delete op.attributes.font;
        delete op.attributes.size;
      }
    });

    return delta;
  };
  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      matchers: [["*", cleanDelta]],
    },
  };
  return (
    <div className="dark:bg-text/60">
      <ReactQuill
        modules={modules}
        theme="snow"
        {...props}
        className="text-primary"
      />
    </div>
  );
};

export default DetailsEditor;
