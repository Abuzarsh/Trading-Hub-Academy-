import { Google } from "@mui/icons-material";
import { Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import OTPInput from "../utils/OtpInput";
import { generateOTP } from "../apiMethods/OtpSendandVerify";
import { toast } from "react-toastify";
import { useLoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";

const LoginPopup = () => {
  const { setShowPopup, setLoading } = useLoginContext();
  const [otpsend, setOtpSend] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [verifyOtpRequest, setVerifyOtpRequest] = useState({
    userOtp: "",
    userId: "",
  });

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEmailSubmit = async () => {
    if (!values.firstName || !values.lastName || !values.email) {
      toast.error("Please fill in all the fields.");
      return;
    }
    try {
      setLoading(true);
      const sendotp = await generateOTP(values); // Ensure 'values.email' is passed here
      if (sendotp.data.userId !== null) {
        toast.success("Otp Sended Succesfully");
        setLoading(false);
        setVerifyOtpRequest({
          userId: sendotp.data.userId,
        });
        setOtpSend(true);
      } else {
        toast.error("Invalid Details");
        setValues({
          firstName: "",
          lastName: "",
          email: "",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(value)) {
      setValues({ ...values, [e.target.name]: value });
    } else {
      toast.error("Invalid email address");
    }
  };

  const login = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend Google auth route
    // window.location.href = "https://thetradinghubacademy.com/auth/google"; // Redirect to backend Google auth route
  };

  // const login = () => {
  //   axios
  //     .get("http://localhost:5000/auth/google/callback", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       Cookies.set("user", response.data);
  //     });
  // };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
        <div className="bg-white rounded-lg w-full sm:w-auto p-6 relative max-w-sm sm:max-w-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold text-center mb-4">
              {otpsend
                ? "Enter OTP to continue"
                : "Enter your details to continue"}
            </h2>
            <button
              className="absolute top-2 right-4 font-bold text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              &#x2715;
            </button>
          </div>
          <Divider variant="middle" className="my-4" />
          {otpsend ? (
            <OTPInput
              verifyOtpRequest={verifyOtpRequest}
              setVerifyOtpRequest={setVerifyOtpRequest}
              values={values}
            />
          ) : (
            <>
              <div className="max-w-sm sm:max-w-lg mx-auto bg-white px-4 py-4 rounded-lg mt-3">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      className="mb-4"
                      size="small"
                      InputLabelProps={{
                        style: { color: "gray" }, // Styling label
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      className="mb-4"
                      InputLabelProps={{
                        style: { color: "gray" },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>

                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mb-4"
                    InputLabelProps={{
                      style: { color: "gray" },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                  />

                  <button
                    onClick={handleEmailSubmit}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg mt-4 hover:opacity-90 transition-all duration-300"
                  >
                    Continue
                  </button>

                  <button
                    onClick={login}
                    className="w-full text-center text-sm font-semibold text-gray-600 mt-4 flex items-center justify-center gap-2 hover:text-gray-800 transition-all duration-300"
                  >
                    OR CONTINUE WITH <Google fontSize="small" />
                  </button>
                </div>
              </div>
            </>
          )}
          <p className="text-xs text-center text-gray-400 mt-4">
            By signing in, you agree to our{" "}
            <Link to="/terms-conditions" className="text-blue-500 underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-blue-500 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
