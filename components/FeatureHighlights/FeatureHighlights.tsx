import { FaShippingFast } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <FaShippingFast className="md:text-4xl text-2xl text-secondary" />,
      title: "Fast Delivery",
      description: "Lorem Ipsum is a place commonly used.",
    },
    {
      icon: <FaCartArrowDown className="md:text-4xl text-2xl text-secondary" />,
      title: "Free Delivery",
      description: "Lorem Ipsum is a place commonly used.",
    },
    {
      icon: <FaHeadphonesAlt className="md:text-4xl text-2xl text-secondary" />,
      title: "Online Support",
      description: "Lorem Ipsum is a place commonly used.",
    },
  ];

  return (
    <section className="bg-primary/50 text-secondary py-6 md:py-10">
      <div className="grid grid-cols-3  text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col  items-center ">
            <div>{feature.icon}</div>
            <h3 className="md:text-xl text-[10px] font-semibold">
              {feature.title}
            </h3>
            <p className="md:text-sm text-[5px] text-w text-secondary/80 ">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
