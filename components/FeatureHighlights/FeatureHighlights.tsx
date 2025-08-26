import { FaShippingFast } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl text-white" />,
      title: "Fast Delivery",
      description: "Lorem Ipsum is a place commonly used.",
    },
    {
      icon: <FaCartArrowDown className="text-4xl text-white" />,
      title: "Free Delivery",
      description: "Lorem Ipsum is a place commonly used.",
    },
    {
      icon: <FaHeadphonesAlt className="text-4xl text-white" />,
      title: "Online Support",
      description: "Lorem Ipsum is a place commonly used.",
    },
  ];

  return (
    <section className="bg-purple-800 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <div>{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-sm text-white/80 max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
