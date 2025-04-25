import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiUrl from "../apiMethods/apiurl"; // Corrected import for default export
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Corrected import

const Paydirect = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentLink, setPaymentLink] = useState(""); // State for generated link
  const [userInfo, setUserInfo] = useState(null);

  console.log(userInfo);

  useEffect(() => {
    const token = Cookies.get("user");
    const decode = jwtDecode(token);
    setUserInfo(decode.user);
    const fetchData = async () => {
      try {
        const res = await apiUrl.get("courses/allCourseslist");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        toast.error("Error fetching courses.");
      }
    };

    fetchData();
  }, []);

  const generatePaymentLink = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course");
      return;
    }

    const paymentAmount = amount || selectedCourse.price;

    try {
      const res = await apiUrl.post("/payment/directpay", {
        amount: paymentAmount,
        courseName: selectedCourse.title,
        customerName: userInfo.display_name,
        customerEmail: userInfo.email,
      });

      if (res.data && res.data.upiLink) {
        setPaymentLink(res.data.upiLink);
        toast.success("Payment link generated successfully!");
      } else {
        console.error("Failed to generate payment link:", res);
        toast.error("Error generating payment link.");
      }
    } catch (err) {
      console.error("Error generating payment link:", err);
      toast.error("There was an error generating the payment link.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.info("Payment link copied to clipboard!");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-blue-900 to-black mt-10 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-white text-center mb-6">
        Course Payment
      </h1>

      <div className="mb-6">
        <label className="block text-gray-200 font-medium mb-2">
          Select Course
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400"
          onChange={(e) => {
            const course = courses.find(
              (course) => course.id === parseInt(e.target.value)
            );
            setSelectedCourse(course);
            setAmount(course ? course.price : "");
          }}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="mb-6 bg-black-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-3">
            {selectedCourse.title}
          </h2>

          <div className="text-black-700 mb-4 bg-white p-4 rounded-lg">
            {selectedCourse.details.map((detail, index) => (
              <div key={index} className="text-sm text-black-600 mb-2">
                {detail}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 bg-white p-4 rounded-lg">
            <label className="text-gray-700 font-medium">Amount (₹):</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setAmount(value);
              }}
              className="border border-gray-300 rounded-lg p-3 w-1/3 bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            />
          </div>
        </div>
      )}

      <button
        className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-black hover:from-blue-600 hover:to-gray-800 transition-all duration-300"
        onClick={generatePaymentLink}
      >
        Generate Payment Link
      </button>

      {paymentLink && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <p className="text-gray-800 mb-4">
            Payment Link:{" "}
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-words"
            >
              {paymentLink}
            </a>
          </p>
          <button
            onClick={copyToClipboard}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <ContentCopyIcon />
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default Paydirect;
