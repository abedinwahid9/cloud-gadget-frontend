import CategoryPage from "@/components/dashboard/(admin)/CategoryPage/CategoryPage";
import Title from "@/components/share/Title/Title";

const page = () => {
  return (
    <div className="space-y-3">
      <Title text="Categories" />
      <CategoryPage />
    </div>
  );
};

export default page;
