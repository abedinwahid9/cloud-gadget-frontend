import CartPage from "@/components/CartPage/CartPage";
import CartTotals from "@/components/CartPage/CartTotals";
import Title from "@/components/share/Title/Title";

const page = () => {
  return (
    <main className="container mx-auto py-5">
      <div className="text-center pb-5">
        <Title text="my shopping cart" />
      </div>
      <CartPage />
    </main>
  );
};

export default page;
