const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const PaymentsModel = require("../models/paymentModels");
const axios = require("axios");
dotenv.config();

const razorpay = new Razorpay({
  // key_id: process.env.PAYMENT_ID || "rzp_test_Chs9VeDFf78ppb",
  // key_secret: process.env.SECRET_KEY || "oskJem8283PzfYXgsVxl3Fln",

  key_id: "rzp_test_Chs9VeDFf78ppb", // Replace with your Razorpay key ID
  key_secret: "oskJem8283PzfYXgsVxl3Fln",
});

const createOrder = async (req, res) => {
  const {
    amount,
    currency = "INR",
    receipt = "receipt#1",
    notes = {},
  } = req.body;

  const options = {
    amount: amount * 100, // Convert to paise
    currency,
    receipt,
    notes,
  };

  try {
    const order = await razorpay.orders.create(options);

    res.json({
      order: order.id,
      currency: order.currency,
      amount: order.amount,
    });
    console.log(order);
  } catch (err) {
    // console.error("Error creating order:", err);
    res.status(500).send("Internal Server Error");
  }
};

const getPaymentId = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      return res.status(404).send("Payment not found");
    }

    PaymentsModel.createPayment(payment)
      .then((payment) => {
        res.json({
          status: payment.status,
          method: payment.method,
          amount: payment.amount,
          currency: payment.currency,
          date: payment.created_at,
          paymentId: payment.id,
        });
      })
      .catch((err) => {
        console.error("Error creating payment:", err);
        res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const fetchAllPaymentList = async (req, res) => {
  try {
    const payments = await PaymentsModel.fetchAllPayments();
    res.status(200).json(payments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const directpay = async (req, res) => {
  try {
    const { amount, courseName, customerName, customerEmail } = req.body;

    // Input validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount provided" });
    }

    if (
      !courseName ||
      typeof courseName !== "string" ||
      courseName.trim() === "" ||
      courseName.length > 100
    ) {
      return res.status(400).json({
        message: "Invalid or excessively long course name provided",
      });
    }

    if (
      !customerName ||
      !customerEmail ||
      !customerContact ||
      typeof customerName !== "string" ||
      customerName.trim() === "" ||
      !/^\+?\d{10,15}$/.test(customerContact) || // Validate contact number
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) // Validate email
    ) {
      return res.status(400).json({
        message: "Invalid customer details provided",
      });
    }

    // Razorpay API endpoint
    const apiUrl = "https://api.razorpay.com/v1/payment_links/";

    // Razorpay API credentials
    const RAZORPAY_KEY_ID = "rzp_test_Chs9VeDFf78ppb"; // Replace with your Razorpay key ID
    const RAZORPAY_KEY_SECRET = "oskJem8283PzfYXgsVxl3Fln"; // Replace with your Razorpay secret

    // Prepare the payload
    const payload = {
      upi_link: true,
      amount: amount * 100, // Amount in smallest currency unit (e.g., paise)
      currency: "INR",
      accept_partial: false,
      reference_id: `COURSE_${Date.now()}`,
      description: `Payment for course: ${courseName}`,
      customer: {
        name: customerName,
        email: customerEmail,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      notes: {
        course_name: courseName,
      },
      callback_url: "https://thetradinghubacademy.com/payment/callback",
      callback_method: "get",
    };

    // Make the API request
    const response = await axios.post(apiUrl, payload, {
      auth: {
        username: RAZORPAY_KEY_ID,
        password: RAZORPAY_KEY_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Send the payment link in the response
    res.status(200).json({
      success: true,
      message: "Payment link generated successfully",
      upiLink: response.data.short_url, // Include the payment link details
    });
  } catch (err) {
    console.error("Error generating Razorpay payment link:", err);

    // Send back a detailed error response
    res.status(500).json({
      success: false,
      message: "Failed to generate payment link",
      error: err.response?.data || err.message || "Unknown error occurred",
    });
  }
};

const handlePaymentCallback = (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    // Validate the signature to ensure it's from Razorpay
    const isSignatureValid = validateRazorpaySignature(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );

    if (!isSignatureValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // Handle successful payment (e.g., update database, send confirmation email)
    console.log("Payment successful:", req.body);
    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Error handling Razorpay callback:", err);
    res
      .status(500)
      .json({ success: false, message: "Error processing payment callback" });
  }
};

// Utility to validate Razorpay signature
const validateRazorpaySignature = (paymentId, orderId, signature) => {
  try {
    const crypto = require("crypto");
    const secret = "your_razorpay_webhook_secret"; // Set this in Razorpay Dashboard
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return generatedSignature === signature;
  } catch (error) {
    console.error("Error validating Razorpay signature:", error);
    return false;
  }
};

module.exports = {
  createOrder,
  getPaymentId,
  fetchAllPaymentList,
  directpay,
  handlePaymentCallback,
};
