import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer2 = () => {
  return (
    <div className="pg-footer">
      <footer
        className="footer"
        style={{
          background: "linear-gradient(180deg, #1a2a44, #0d1f38, #001d30)",
        }}
      >
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between w-[80%] mx-auto">
            {/* About Us Section */}
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8 mt-10 sm:mt-0">
              <div>
                <h4 className="text-xl text-white capitalize mb-8 relative font-medium">
                  About Us
                  <span className="block w-full h-0.5 bg-blue-500 hover:w-48 transition-all absolute left-0 -bottom-2"></span>
                </h4>
                <p className="text-base text-gray-300 hover:text-white hover:pl-2 transition-all">
                  Take your productivity to the next level while maximizing your
                  happiness and life satisfaction - In association with
                  @growmore finance
                </p>
              </div>
            </div>
            {/* Contact Us Section */}
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8 mt-10 sm:mt-0">
              <div>
                <h4 className="text-xl text-white capitalize mb-4 relative font-medium">
                  Contact Us
                  <span className="block w-full h-0.5 bg-blue-500 hover:w-48 transition-all absolute left-0 -bottom-2"></span>
                </h4>
                <p className="text-base text-gray-300 hover:text-white hover:pl-2 transition-all">
                  TradingHub Academy,
                  <br />
                  104, MARWAH ESTATE, off Saki Vihar Road,
                  <br />
                  opp. TATA Power House, Ashok Nagar Society,
                  <br />
                  Udyan Complex, Marol, Andheri East,
                  <br />
                  Mumbai, Maharashtra 400072
                  <br />
                  Email:support-care@thetradinghubacademy.com
                  <a
                    href="support-care@thetradinghubacademy.com"
                    className="text-gray-400 hover:text-white"
                  ></a>
                </p>
              </div>
            </div>
            {/* Follow Us Section */}
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8 mt-10 sm:mt-0">
              <div>
                <h4 className="text-xl text-white capitalize mb-4 relative font-medium">
                  Contact Us
                  <span className="block w-full h-0.5 bg-blue-500 hover:w-48 transition-all absolute left-0 -bottom-2"></span>
                </h4>
                <div className="flex justify-center gap-3 mt-5 ml-2">
                  {/* <a
                    href="/facebook"
                    className="text-blue-900 hover:text-white bg-blue-200 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                  >
                    <FaFacebook className="text-xl" />
                  </a> */}
                  <a
                    href="/instagram"
                    className="text-red-600 hover:text-white bg-blue-200 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  {/* <a
                    href="/linkedin"
                    className="text-blue-900 hover:text-white bg-blue-200 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                  >
                    <FaLinkedin className="text-xl" />
                  </a> */}
                  {/* <a
                    href="/twitter"
                    className="text-blue-900 hover:text-white bg-blue-200 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                  >
                    <FaTwitter className="text-xl" />
                  </a> */}
                  <a
                    href="https://youtube.com/@growmorefinanceeducation?si=YBNhdOdRFWLnoC2a"
                    className="text-red-600 hover:text-gray-900 hover:bg-white bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-xl" />
                  </a>
                  <a
                    href="https://wa.me/918928720003"
                    className="text-red-600 hover:text-white bg-blue-200 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#001d30", // Dark blue background for the footer bottom section
          }}
          className="text-white text-center py-4"
        >
          <hr className="w-4/5 mx-auto mb-5 border-blue-300" />
          <p className="text-sm">
            © 2024 All Rights Reserved By Tradinghub Academy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer2;
