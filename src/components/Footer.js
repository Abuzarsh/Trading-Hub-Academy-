import React from "react";

const Footer = () => {
  const handleBookDemo = () => {
    // Open WhatsApp link
    window.open("https://wa.me/918928720003", "_blank");
  };

  return (
    <footer className="text-white pt-10">
      {/* Overlay */}
      <div className="bg-blue-900 bg-opacity-90 py-12">
        <div className="flex flex-wrap justify-between items-center px-8 md:px-16 py-8 rounded-lg">
          {/* Left Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-extrabold mb-4 text-white">
              Book a Demo
            </h3>
            <p className="text-blue-200 mb-6">
              Experience our services firsthand by scheduling a demo today.
            </p>
            <button
              onClick={handleBookDemo}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-300 shadow-lg"
            >
              Book Demo
            </button>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 text-center">
            <h4 className="text-xl font-semibold text-white mb-4">
              Need Help?
            </h4>
            <p className="text-blue-200">
              Have any questions? <br />
              <a
                href="https://wa.me/918928720003"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
