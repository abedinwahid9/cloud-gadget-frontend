import React from "react";

const Title = ({ text }: { text: string }) => {
  return (
    <div className="md:text-3xl text-base text-secondary font-semibold capitalize   dark:text-nav">
      {text}
    </div>
  );
};

export default Title;
