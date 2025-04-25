const express = require("express");
const passport = require("passport");
const session = require("./config/session");
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/UserRoutes");
const courseRoutes = require("./routes/courseRoutes");
const protectedMiddleware = require("./middleware/auth");
const dotenv = require("dotenv");
const { connectDB } = require("./config/DbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/passport");
require("./config/session");

dotenv.config();

const app = express();

connectDB();
const corsOptions = {
  origin: process.env.ACCEPT_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent with requests
};

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
// Routes
app.use("/auth", authRoutes);

app.use("/otp", otpRoutes);

app.use("/admin", userRoutes);

app.use("/courses", courseRoutes);

app.use("/payment", protectedMiddleware.authenticateUser, paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
