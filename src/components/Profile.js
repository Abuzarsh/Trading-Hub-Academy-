import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Profile = ({ name, email, image, onlogout }) => {
  const [isModalOpen, setModalOpen] = useState(false); // Toggle modal visibility
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);
  return (
    <div className="relative group">
      {/* Profile Image */}
      <button
        onClick={() => setModalOpen(!isModalOpen)} // Toggle modal
        className="w-14 h-14"
      >
        <img
          src={image}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
        />
      </button>

      {/* Mobile-Friendly Bottom Sheet (Shown on small screens only) */}
      <div className="block lg:hidden">
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
            {/* Modal Content */}
            <div
              className="bg-white w-full rounded-t-2xl shadow-lg p-6"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              {/* Profile Details */}
              <div className="flex items-center mb-4">
                <img
                  src={image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                />
                <div className="ml-4">
                  <p className="text-gray-900 text-start  font-bold">{name}</p>
                  <p className="text-gray-500 text-sm">{email}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  onlogout();
                  setModalOpen(false); // Close modal on logout
                }}
                className="flex justify-center px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <LogOut className="mr-2" />
                Logout
              </button>

              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 text-center w-full py-2 px-4 bg-gray-200 text-gray-600 rounded-md border border-gray-300 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dropdown for Larger Screens */}
      <div
        className={`absolute top-full right-0 bg-white rounded-lg shadow-lg p-4 z-10 w-96 border border-gray-200 hidden ${
          isModalOpen && "lg:block hidden"
        }`}
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        <div className="flex items-center mb-4">
          <img
            src={image}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
          <div className="ml-4">
            <p className="text-gray-900 text-start font-bold">{name}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>

        <button
          onClick={onlogout}
          className="flex justify-center px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
