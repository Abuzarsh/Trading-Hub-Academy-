// import React, { useEffect, useState } from "react";
// import { useLoginContext } from "../context/LoginContext";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode"; // Correct import
// import apiUrl from "../apiMethods/apiurl";
// import { Edit } from "@mui/icons-material";

// import img1 from "../assets/img/img1.jpg";
// import img2 from "../assets/img/img2.jpg";
// import img3 from "../assets/img/img3.jpg";
// import img4 from "../assets/img/img4.jpg";

// const AddToCart = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [subtotal, setSubtotal] = useState(0); // Placeholder for product data

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("user");
//     if (token) {
//       const decode = jwtDecode(token);
//       setUserInfo(decode.user);
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   const onLoad = (src) => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () =>
//         reject(new Error("Failed to load Razorpay script"));
//       document.body.appendChild(script);
//     });
//   };

//   const createRazorpayOrder = (amount) => {
//     const data = JSON.stringify({
//       amount: amount, // Convert amount to paise
//       currency: "INR",
//       receipt: "ORDER_123456789",
//       notes: {
//         key1: "payment",
//         key2: "from user",
//       },
//     });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };

//     apiUrl
//       .post("/payment/orders", config.data, {
//         headers: config.headers,
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           if (res.data && res.data.amount) {
//             handleRazorpayScreen(res.data.amount);
//           }
//         } else {
//           console.error("Unexpected response status:", res.status);
//         }
//       })
//       .catch((err) => {
//         if (
//           err.response &&
//           (err.response.status === 401 || err.response.status === 403)
//         ) {
//           navigate("/");
//         } else {
//           console.error("Error creating Razorpay order:", err.message || err);
//         }
//       });
//   };

//   const handleRazorpayScreen = async (amount) => {
//     const res = await onLoad("https://checkout.razorpay.com/v1/checkout.js");
//     if (!res) {
//       alert("Failed to load Razorpay");
//       return;
//     }

//     const options = {
//       key: "rzp_test_Chs9VeDFf78ppb", // Replace with your Razorpay key
//       amount: amount,
//       currency: "INR",
//       name: userInfo?.display_name || "User",
//       description: "Payment of TradingHubAcademy",
//       handler: (response) => {
//         navigate("/success", {
//           state: { paymentId: response.razorpay_payment_id },
//         });
//       },
//       prefill: {
//         name: userInfo?.display_name || "",
//         email: userInfo?.email || "",
//       },
//       theme: {
//         color: "#007BFF",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const [course, setCourse] = useState({});
//   useEffect(() => {
//     const fetchData = async () => {
//       const id = Number(sessionStorage.getItem("id"));

//       console.log(id);
//       const res = await apiUrl.post("/courses/searchCoursebyId", { id });
//       if (res.data) {
//         setCourse(res.data);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(course);

//   const gst = subtotal * 0.18;
//   const platformFee = 2;
//   const total = subtotal + gst + platformFee;

//   return (
//     <div className="max-w-2xl mx-auto bg-gray-100 p-6 mt-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Your Cart
//       </h1>
//       <div className="space-y-6">
//         <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row">
//           <div className="md:w-1/3 w-full flex justify-center items-center">
//             <img
//               src={course?.img}
//               alt={course?.title}
//               className="h-44 w-44 object-cover rounded-md"
//             />
//           </div>
//           <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
//             <h2 className="text-xl font-bold text-gray-700">{course.title}</h2>
//             <ul className="text-gray-600 text-sm mt-2">
//               {course.details?.map((detail, idx) => (
//                 <li key={idx} className="mb-1">
//                   • {detail}
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4">
//               <p className="text-lg font-bold text-gray-800">
//                 Price: ₹{course?.price.toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-500 line-through">
//                 ₹{course?.discount.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Cart Summary
//           </h2>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <p className="text-gray-600">Subtotal</p>
//               {edit ? (
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     value={subtotal}
//                     onChange={(e) => setSubtotal(Number(e.target.value))}
//                     className="border border-gray-300 rounded px-2 py-1 text-gray-800 w-20"
//                   />
//                   <button
//                     onClick={() => setEdit(false)}
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
//                   >
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center">
//                   <p className="font-semibold text-gray-800">
//                     ₹{subtotal.toLocaleString()}
//                   </p>
//                   <button
//                     onClick={() => setEdit(true)}
//                     className="text-gray-500 hover:text-blue-500 ml-2"
//                   >
//                     <Edit fontSize="small" />
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-between">
//               <p className="text-gray-600">GST (18%)</p>
//               <p className="font-semibold text-gray-800">₹{gst.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="text-gray-600">Platform Fee</p>
//               <p className="font-semibold text-gray-800">₹2</p>
//             </div>
//             <div className="border-t pt-4 flex justify-between">
//               <p className="text-lg font-bold text-gray-800">Total</p>
//               <p className="text-lg font-bold text-gray-800">
//                 ₹{total.toLocaleString()}
//               </p>
//             </div>
//           </div>
//           <button
//             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg mt-4 hover:opacity-90 transition-all duration-300"
//             onClick={() => createRazorpayOrder(total)}
//           >
//             Pay ₹{total.toLocaleString()}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddToCart;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Corrected import
import apiUrl from "../apiMethods/apiurl";
import { Edit } from "@mui/icons-material";

import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img4 from "../assets/img/img4.jpg";

const AddToCart = () => {
  const courseImages = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
  };
  const [userInfo, setUserInfo] = useState(null);
  const [edit, setEdit] = useState(false);
  const [subtotal, setSubtotal] = useState(0); // Placeholder for product data

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      try {
        const decode = jwtDecode(token);
        setUserInfo(decode.user);
      } catch (err) {
        console.error("Invalid token", err);
        sessionStorage.removeItem("id");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const onLoad = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay script"));
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    const data = {
      amount: amount, // Convert amount to paise
      currency: "INR",
      receipt: "ORDER_123456789",
      notes: {
        key1: "payment",
        key2: "from user",
      },
    };

    apiUrl
      .post("/payment/orders", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200 && res.data?.amount) {
          handleRazorpayScreen(res.data.amount);
        } else {
          console.error("Unexpected response:", res);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/");
          sessionStorage.removeItem("id");
        } else {
          console.error("Error creating Razorpay order:", err.message || err);
        }
      });
  };

  const handleRazorpayScreen = async (amount) => {
    try {
      await onLoad("https://checkout.razorpay.com/v1/checkout.js");
      const options = {
        key: "rzp_test_Chs9VeDFf78ppb", // Replace with your Razorpay key
        amount,
        currency: "INR",
        name: userInfo?.display_name || "User",
        description: "Payment of TradingHubAcademy",
        handler: (response) => {
          navigate("/success", {
            state: { paymentId: response.razorpay_payment_id },
          });
        },
        prefill: {
          name: userInfo?.display_name || "",
          email: userInfo?.email || "",
        },
        theme: {
          color: "#007BFF",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert("Failed to load Razorpay");
      console.error(err);
    }
  };

  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const id = Number(sessionStorage.getItem("id"));
      try {
        const res = await apiUrl.post("/courses/searchCoursebyId", { id });
        if (res.data) {
          // Bind course image before updating state
          const courseWithImage = {
            ...res.data,
            img: courseImages[res.data.id] || img1, // Default to img1 if no match found
          };
          setCourse(courseWithImage);
          setSubtotal(res.data.price);
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };
    fetchData();
  }, []);

  const gst = subtotal * 0.18;
  const platformFee = 2;
  const total = subtotal + gst + platformFee;

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Cart
      </h1>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row">
          <div className="md:w-1/3 w-full flex justify-center items-center">
            <img
              src={course?.img || img1}
              alt={course?.title || "Course Image"}
              className="h-44 w-44 object-cover rounded-md"
            />
          </div>
          <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-700">
              {course?.title || "Course Title"}
            </h2>
            <ul className="text-gray-600 text-sm mt-2">
              {course?.details?.map((detail, idx) => (
                <li key={idx} className="mb-1">
                  • {detail}
                </li>
              )) || <li>No details available</li>}
            </ul>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-800">
                Price: ₹{course?.price?.toLocaleString() || "0"}
              </p>
              {course?.discount && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{course?.discount.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Cart Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              {edit ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={subtotal}
                    onChange={(e) => setSubtotal(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-gray-800 w-20"
                  />
                  <button
                    onClick={() => setEdit(false)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="font-semibold text-gray-800">
                    ₹{subtotal.toLocaleString()}
                  </p>
                  <button
                    onClick={() => setEdit(true)}
                    className="text-gray-500 hover:text-blue-500 ml-2"
                  >
                    <Edit fontSize="small" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">GST (18%)</p>
              <p className="font-semibold text-gray-800">₹{gst.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Platform Fee</p>
              <p className="font-semibold text-gray-800">₹2</p>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <p className="text-lg font-bold text-gray-800">Total</p>
              <p className="text-lg font-bold text-gray-800">
                ₹{total.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg mt-4 hover:opacity-90 transition-all duration-300"
            onClick={() => createRazorpayOrder(total)}
          >
            Pay ₹{total.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
