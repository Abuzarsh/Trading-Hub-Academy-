import React from "react";
import { Link } from "react-router-dom";

const FailedPaymentPage = () => {
  return (
    <div className="failed-page">
      <h1>Payment Failed</h1>
      <p>There was an issue with your payment. Please try again.</p>
      <Link to="/cart">
        <button>Retry Payment</button>
      </Link>
    </div>
  );
};

export default FailedPaymentPage;
