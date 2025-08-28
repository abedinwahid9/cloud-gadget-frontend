"use client";
import React, { useState } from "react";
import { Mail, Send, Check, Heart, Sparkles, Bell } from "lucide-react";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubscribed(true);

    // Reset after 3 seconds for demo
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  if (isSubscribed) {
    return (
      <div className="w-full  mx-auto p-8">
        <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl p-8 shadow-2xl border border-green-200 overflow-hidden">
          {/* Success Animation Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse"></div>

          {/* Floating Success Elements */}
          <div className="absolute top-4 right-4 animate-bounce">
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </div>

          <div className="relative text-center space-y-6">
            {/* Success Icon with Scale Animation */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-lg animate-pulse">
              <Check className="w-10 h-10 text-white animate-bounce" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-800 animate-fade-in">
                Welcome Aboard! 🎉
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thanks for subscribing! Check your inbox for our welcome email.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto  ">
      <div className="relative bg-gradient-to-br from-primary/25 via-secondary/25 to-indigo-50 p-8 shadow-2xl ow-hidden ">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>

        {/* Floating Icons */}
        <div className="absolute top-6 right-6 animate-bounce animation-delay-500">
          <Heart className="w-5 h-5 text-badge " />
        </div>
        <div className="absolute top-12 left-8 animate-bounce animation-delay-1000">
          <Bell className="w-6 h-6 text-badge" />
        </div>

        <div className="relative space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-4">
            {/* Animated Mail Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-3">
              <Mail className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Subscribe Newsletter
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                You will never miss our podcasts, latest news etc. Our
                newsletter is once a week, every Thursday.
              </p>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@youremail.com"
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-secondary rounded-2xl text-secondary placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:shadow-md focus:bg-white"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-badge transition-colors duration-300" />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !email}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:from-pink-600 hover:via-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              {/* Button Background Animation */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isHovered ? "translate-x-1 -translate-y-1" : ""
                      }`}
                    />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
              <Heart className="w-3 h-3 text-pink-400" />
              <span>We promise not to spam you!</span>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-60 animate-pulse animation-delay-500"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default EmailSubscription;
