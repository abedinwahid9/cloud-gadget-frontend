import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

interface FormImageProps {
  src: string | null;
  onDelete?: () => void;
}

const FormImage: React.FC<FormImageProps> = ({ src, onDelete }) => {
  if (!src) return null;

  return (
    <div className="overflow-hidden h-full w-full rounded-md border relative group">
      <Image
        width={0}
        height={0}
        src={src}
        alt="preview"
        className="h-full w-full object-contain"
      />

      <button
        type="button"
        onClick={onDelete}
        className="absolute hidden group-hover:block top-1 right-1 rounded-full overflow-hidden cursor-pointer"
      >
        <MdDeleteForever className="w-6 h-6 bg-badge/70 text-white p-0.5" />
      </button>
    </div>
  );
};

export default FormImage;
