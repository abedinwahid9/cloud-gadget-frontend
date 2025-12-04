import Title from "@/components/share/Title/Title";
import WishList from "@/components/WishList/WishList";

const page = async () => {
  return (
    <main className="container mx-auto py-5 px-2">
      <div className="text-center pb-5">
        <Title text="my wishlist" />
      </div>
      <WishList />
    </main>
  );
};

export default page;
