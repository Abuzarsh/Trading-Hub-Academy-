const express = require("express");
const router = express.Router();
const CourseModel = require("./models/CourseModel");

router.post("/razorpay/generate-upi-link", async (req, res) => {
  try {
    const { amount, courseName } = req.body;

    // Input validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount provided" });
    }

    if (!courseName || typeof courseName !== "string" || courseName.trim() === "") {
      return res.status(400).json({ message: "Invalid course name provided" });
    }

    // Generate the payment link
    const paymentLink = await CourseModel.generateUpiPaymentLink(amount, courseName);
    res.status(200).json(paymentLink); // Send back the payment link

  } catch (err) {
    console.error("Error generating Razorpay payment link:", err);
    res.status(500).json({ message: "Error generating payment link", error: err.message });
  }
});

module.exports = router;
