import React from "react";

const Title = ({ text }: { text: string }) => {
  return (
    <div className="md:text-3xl text-base text-primary font-semibold capitalize   dark:text-text">
      {text}
    </div>
  );
};

export default Title;
