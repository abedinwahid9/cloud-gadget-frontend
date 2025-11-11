import { FaHeart } from "react-icons/fa";

const Wishlist = ({ css }: { css: string }) => {
  return (
    <div className="relative">
      <FaHeart className={`${css} `} />{" "}
      <span
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        className="absolute text-xs font-bold tabular-nums leading-none text-primary"
      >
        5
      </span>
    </div>
  );
};

export default Wishlist;
