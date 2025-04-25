const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/orders", paymentController.createOrder);
router.get("/:paymentId", paymentController.getPaymentId);
router.post("/getAllPaymentList", paymentController.fetchAllPaymentList);
router.post("/directpay", paymentController.directpay);
router.post("/callback", paymentController.handlePaymentCallback);

module.exports = router;
