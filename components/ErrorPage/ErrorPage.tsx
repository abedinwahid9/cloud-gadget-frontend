import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
      >
        <source src="/error.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Oops!
        </h1>
        <p className="mt-4 text-base md:text-xl text-gray-200">
          Something went wrong. Please try again.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <Link href="/">
            <Button className="px-6 py-3 text-lg bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
