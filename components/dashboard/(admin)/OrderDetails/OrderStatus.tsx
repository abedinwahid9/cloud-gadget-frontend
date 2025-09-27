import React, { useState } from "react";
import { CheckCircle2, Clock, Truck, Package, MapPin } from "lucide-react";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";

const initialSteps = [
  {
    id: 1,
    title: "Order received",
    description: "We've received your order successfully",
    date: "Mon 09:15 AM",
    completed: false,
    completedAt: null as Date | null,
    icon: Package,
  },
  {
    id: 2,
    title: "Processing",
    description: "Your order is being prepared",
    date: "Tue 10:30 AM",
    completed: false,
    completedAt: null,
    icon: Clock,
  },
  {
    id: 3,
    title: "Shipped",
    description: "Your package left our warehouse",
    date: "Wed 02:45 PM",
    completed: false,
    completedAt: null,
    icon: Truck,
  },

  {
    id: 5,
    title: "Out for delivery",
    description: "Driver is bringing your package",
    date: "Today 09:30 AM",
    completed: false,
    completedAt: null,
    icon: Truck,
  },
  {
    id: 6,
    title: "Delivered",
    description: "Package delivered successfully",
    date: "Expected today",
    completed: false,
    completedAt: null,
    icon: CheckCircle2,
  },
];

const OrderStatus = () => {
  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    const now = new Date();
    setSteps((prev) =>
      prev.map((step, index) =>
        index === currentStep
          ? { ...step, completed: true, completedAt: now }
          : step
      )
    );
    setCurrentStep((prev) => prev + 1);
  };

  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className=" shadow-lg rounded-2xl p-8 border bg-primary/20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Order Status</h2>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-lg font-semibold text-blue-600">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="w-full bg-primary/20 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Order placed</span>
          <span>Delivered</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 -z-10"></div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="relative mb-8 last:mb-0">
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${
                    step.completed
                      ? "bg-green-500 border-green-500 text-white shadow-lg"
                      : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg animate-pulse"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          step.completed
                            ? "text-gray-900"
                            : isCurrent
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm mb-2 ${
                          step.completed || isCurrent
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Right side: either button or completed info */}
                    {!isCurrent ? (
                      <div className="text-right ml-4">
                        <div
                          className={`text-sm font-medium ${
                            step.completed
                              ? "text-green-600"
                              : isCurrent
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.date}
                        </div>
                        {step.completed && step.completedAt && (
                          <div className="text-xs text-green-500 mt-1">
                            ✓ Complete at {step.completedAt.toLocaleString()}
                          </div>
                        )}
                        {isCurrent && (
                          <div className="text-xs text-blue-500 mt-1">
                            ● In progress
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <CustomBtn
                          title={`Move to ${
                            steps[currentStep + 1]?.title || "Finish"
                          }`}
                          className="rounded-md"
                          handleBtn={handleNext}
                        />
                      </div>
                    )}
                  </div>

                  {/* Current step highlight */}
                  {isCurrent && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center text-blue-700">
                        <Clock size={16} className="mr-2" />
                        <span className="text-sm font-medium">
                          Currently in progress
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Estimated Delivery</div>
            <div className="font-semibold text-gray-900">Today by 6:00 PM</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Tracking ID</div>
            <div className="font-semibold text-gray-900">#TK123456789</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Carrier</div>
            <div className="font-semibold text-gray-900">Express Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
