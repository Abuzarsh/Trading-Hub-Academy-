import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import apiUrl from "../apiMethods/apiurl";

const PaymentSuccessPage = () => {
  const [paymentDetails1, setPaymentDetails1] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId;
  // const paymentId = "pay_PhmtRXywWOJHQg"; // Replace with actual ID logic if needed

  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  console.log(paymentDetails1);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  };

  useEffect(() => {
    if (!paymentId) {
      // console.error("Payment ID not found.");
      navigate("/cart");
      return;
    }

    const fetchPaymentDetails = async (id) => {
      try {
        const res = await apiUrl.get(`payment/${id}`);
        setPaymentDetails1({
          ...res.data,
          formattedDate: formatDate(res.data.date),
        });
      } catch (error) {
        // console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails(paymentId);

    const token = Cookies.get("user");
    if (token) {
      const data = jwtDecode(token);
      // console.log(data);
      setUser(data.user);
    } else {
      navigate("/");
    }
  }, [paymentId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full"
        data-aos="fade-up"
        data-aos-duration={1000}
        data-aos-delay={100}
      >
        <div className="text-center">
          <div className="bg-green-500 text-white rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4 animate__animated animate__bounceIn">
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mt-3">
            Thank you,{" "}
            <span className="font-semibold">{user?.display_name}</span>!
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">
            Payment Details
          </h3>
          <div className="mt-4 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">Payment ID:</span>{" "}
              {paymentDetails1?.paymentId || "N/A"}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Amount:</span> ₹
              {paymentDetails1 ? paymentDetails1.amount / 100 : "N/A"}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Date:</span>{" "}
              {paymentDetails1?.formattedDate || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
