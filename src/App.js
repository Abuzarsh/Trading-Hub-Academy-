import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddToCart from "./components/AddToCard";
import Paydirect from "./components/pay-direct";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FailedPaymentPage from "./pages/FailedPaymentPage";

import logo from "./assets/logo.png";
import TermsAndCondition from "./components/TermsAndCondition";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AdminDashboard from "./components/Admin/AdminDashboard";

const App = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = logo; // Use the imported image
    document.head.appendChild(link);

    // Cleanup to remove the favicon on unmount (optional)
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  // const userDetails = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  // };

  // const paymentDetails = {
  //   paymentId: "pay_1234567890abcdef",
  //   receipt: "receipt_12345",
  //   amount: 50000, // Razorpay uses paise; divide by 100 for INR
  //   date: "2025-01-07T10:30:00Z",
  // };
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/pay-direct" element={<Paydirect />} />
        <Route path="/terms-conditions" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<PaymentSuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        //adil
        {/* <Route path="/failed" element={<FailedPaymentPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
