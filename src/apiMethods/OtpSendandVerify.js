import axios from "axios";
import apiUrl from "./apiurl";

// Base URL for the backend API
// const API_BASE_URL = "https://thetradinghubacademy.com/"; // Adjust according to your server URL
// const API_BASE_URL = "http://localhost:5000";

// Function to generate OTP
export const generateOTP = async (values) => {
  try {
    const response = await apiUrl.post("otp/generate-otp", values, {
      withCredentials: true,
    });
    return response; // Contains the message like "OTP generated and sent to your email."
  } catch (error) {
    console.error("Error generating OTP:", error);
    // throw new Error("Failed to generate OTP");
  }
};

// Function to verify OTP
export const verifyOTP = async (verifyOTP) => {
  debugger;
  try {
    const response = await apiUrl.post("/otp/verify-otp", verifyOTP, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
    // Contains the message like "OTP verified successfully."
  } catch (error) {
    console.error("Error verifying OTP:", error);
    // throw new Error("Failed to verify OTP");
  }
};
