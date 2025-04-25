import { Button, TextField } from "@mui/material";
import { Link } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { generateOTP, verifyOTP } from "../apiMethods/OtpSendandVerify";
import { useLoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const OTPInput = ({
  length = 6,
  verifyOtpRequest,
  setVerifyOtpRequest,
  values,
}) => {
  const { setIsLoggedIn, setShowPopup, setUser, user, setLoading } =
    useLoginContext();

  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Ensure only 1 digit is entered
    setOtp(updatedOtp);
    setVerifyOtpRequest((prev) => ({ ...prev, userOtp: updatedOtp.join("") }));
    // Move focus to the next field if a digit is entered
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // If the current field is empty, move to the previous field
        inputs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData
      .getData("text")
      .split("")
      .filter((char) => /^\d$/.test(char)); // Filter only digits
    const updatedOtp = otp.map((char, i) => pastedData[i] || char);
    setOtp(updatedOtp);
    const filledLength = Math.min(pastedData.length, length);
    inputs.current[filledLength - 1]?.focus(); // Focus the last filled field
  };

  const handleSubmit = async () => {
    debugger;
    if (otp.every((digit) => digit)) {
      const res = await verifyOTP(verifyOtpRequest);
      console.log(res);
      if (res === undefined) {
        setIsLoggedIn(false);
        setUser(null);
        setShowPopup(true);
        setOtp(Array(length).fill(""));
        setIsError(true);
        setError("Invalid OTP. Please try again.");
      } else {
        toast.success("Verified Email");
        setIsLoggedIn(true);
        // setUser(JSON.parse(res.user));
        const userCookie = Cookies.get("user");
        if (userCookie) {
          const decodedUser = jwtDecode(userCookie);
          setUser(decodedUser.user); // Parse and set user data from cookie
        }
        setShowPopup(false);
        setOtp(Array(length).fill(""));
        setIsError(false);
        setError("");
      }
    } else if (otp.every((digit) => digit === "")) {
      setIsError(true);
      setError("*Please Enter Verification Code");
    } else {
      setIsError(true);
      setError("*Entered Verification Code is Invalid");
    }
  };

  console.log(user);

  const handleResendClick = async () => {
    setLoading(true);
    const res = await generateOTP(values);
    if (res.data.userId !== null) {
      toast.success("Otp Sended Succesfully");
      setLoading(false);
      setVerifyOtpRequest({
        userId: res.data.userId,
      });
    } else {
      toast.error("Failed to send OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      <div>
        <p className="text-md text-start">We have sent you an OTP</p>
        <p className="text-sm text-start">
          Enter the 6 digit OTP sent on Email to proceed. Resend if you didn't
          recieve it.
        </p>
      </div>
      <div className="flex space-x-2">
        {otp.map((value, index) => (
          <TextField
            key={index}
            variant="outlined"
            className="w-12"
            sx={{
              width: "40px",
              marginRight: "5px",
              textAlign: "center",
              "& input": {
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "10px",
              },
            }}
            inputProps={{
              maxLength: 1,
              type: "tel",
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            type="text"
            value={value}
            inputRef={(el) => (inputs.current[index] = el)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            error={isError}
            size="small"
          />
        ))}
      </div>
      {isError && (
        <p className="lg:text-sm md:text-sm text-xs text-red-500">{error}</p>
      )}
      <Button
        variant="contained"
        color="primary"
        className="w-2/5 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg mt-4 hover:opacity-90 transition-all duration-300"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <p className="text-xs text-gray-600">
        Didn't receive OTP?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent page reload
            handleResendClick();
          }}
          underline="hover"
          className="text-blue-500 font-medium"
          aria-label="Resend OTP"
        >
          Resend OTP
        </a>
      </p>
    </div>
  );
};

export default OTPInput;
