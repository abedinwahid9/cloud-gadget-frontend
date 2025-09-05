"use client";

import React from "react";

interface SpecificationSectionProps {
  title?: string;
  content: string; // Quill output (HTML string)
}
const SpecificationSection = ({
  title = "Specifications",
  content,
}: SpecificationSectionProps) => {
  return (
    <div className="mt-8 bg-primary/20 rounded-xl shadow p-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>

      {/* Quill Rich Text Output */}
      <div
        className="prose prose-sm md:prose-base max-w-none prose-headings:text-primary prose-p:text-secondary prose-li:marker:text-primary prose-strong:text-secondary"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default SpecificationSection;
