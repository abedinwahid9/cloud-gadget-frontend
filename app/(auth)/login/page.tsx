import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("@/components/Register/SignIn"));

const page = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default page;
