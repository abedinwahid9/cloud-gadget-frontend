import ProductCard from "@/components/share/ProductCard/ProductCard";
import img2 from "@/app/assets/img3.png";
import Title from "@/components/share/Title/Title";

const page = () => {
  return (
    <main className="container mx-auto py-5">
      <div className="text-center pb-5">
        <Title text="my wishlist" />
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 px-2  h-auto">
        {/* {Array.from({ length: 5 }).map((post, i) => (
          <ProductCard
            id={i}
            title={"title"}
            imageUrl={img2}
            price={45}
            oldPrice={50}
            category="headphone"
            // key={post.id || i}
            key={i}
          />
        ))} */}
      </div>
    </main>
  );
};

export default page;
