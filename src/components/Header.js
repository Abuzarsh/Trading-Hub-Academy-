import React, { useEffect } from "react";
import Profile from "./Profile";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoginContext } from "../context/LoginContext";
import img from "../assets/user_779141.png";
import logo from "../assets/logo.png";
import apiUrl from "../apiMethods/apiurl";
const Header = () => {
  const { setShowPopup, isLoggedIn, user, setIsLoggedIn, setUser } =
    useLoginContext();
  const onlogout = () => {
    apiUrl.get("auth/logout").then((res) => {
      Cookies.remove("user");
      sessionStorage.clear();
      setShowPopup(false);
      setIsLoggedIn(false);
      setUser(null);
    });
  };

  // const onlogout = () => {
  //   axios.get("https://thetradinghubacademy.com/auth/logout").then((res) => {
  //     Cookies.remove("user");
  //     setShowPopup(false);
  //     setIsLoggedIn(false);
  //     setUser(null);
  //   });
  // };

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md">
      <div className="text-gray-800 text-2xl font-bold tracking-widest flex justify-between">
        {/* App Logo or Title */}
        <img
          src={logo}
          alt="Logo"
          className="w-14 h-14 sm:w-12 sm:h-12 object-cover "
        />
        <h1 className="text-lg ml-4 mt-2 sm:text-xl md:text-2xl">
          Trading Hub Academy
        </h1>
      </div>
      {isLoggedIn ? (
        <Profile
          name={user.display_name || "user"}
          email={user.email || "dummy23@gmail.com"}
          image={user.photo || img}
          onlogout={onlogout}
        />
      ) : (
        <button
          className="bg-indigo-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-600 transition-all duration-300 text-sm sm:text-base"
          onClick={() => setShowPopup(true)}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
