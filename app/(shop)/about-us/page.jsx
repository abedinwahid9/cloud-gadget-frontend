import CustomDemo from "../../../components/CustomDemo/CustomDemo";

const page = () => {
  return (
    <div className="md:py-10 py-3 md:px-5 px-1">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 ">
        <CustomDemo />
        <CustomDemo />
        <CustomDemo />
        <CustomDemo />
        <CustomDemo />
      </div>
    </div>
  );
};

export default page;
