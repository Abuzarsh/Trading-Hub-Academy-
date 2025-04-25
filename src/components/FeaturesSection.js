import React, { useEffect } from "react";
import "../css/style.css"; // Ensure Tailwind is properly set up in this file
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialize AOS with a 1-second duration
  }, []);

  return (
    <div className="container mx-auto py-16 px-6 sm:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-black mb-4">
          Why Choose Our Courses?
        </h2>
        <p className="text-lg text-blue-600">
          Unlock the potential of learning with our exclusive features.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          data-aos="fade-up-right"
          data-aos-duration="2000"
        >
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-wallet text-blue-600 text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Easy Payment Method
          </h3>
          <p className="text-gray-600 text-center">
            Choose from multiple payment options tailored to your needs.
          </p>
        </div>
        {/* Feature 2 */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          data-aos="fade-up-right"
        >
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-infinity text-blue-600 text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Lifetime Course Access
          </h3>
          <p className="text-gray-600 text-center">
            Learn at your own pace with unlimited course access.
          </p>
        </div>
        {/* Feature 3 */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          data-aos="fade-up-right"
        >
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-laptop-house text-blue-600 text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Learn Anytime, Anywhere
          </h3>
          <p className="text-gray-600 text-center">
            Access your courses anytime, on any device.
          </p>
        </div>
        {/* Feature 4 */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          data-aos="fade-up-right"
        >
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-tags text-blue-600 text-4xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Guaranteed Best Pricing
          </h3>
          <p className="text-gray-600 text-center">
            Get the best value for your investment in learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
