import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLoginContext } from "../context/LoginContext";
import apiUrl from "../apiMethods/apiurl";
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img4 from "../assets/img/img4.jpg";

function CourseCurriculum() {
  const [openIndex, setOpenIndex] = useState(null);
  const [courses, setCourses] = useState([]);

  const { setShowPopup } = useLoginContext();
  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiUrl.get("courses/allCourseslist");

        const images = [img1, img2, img3, img4];

        const updatedCourses = res.data.map((course, index) => ({
          ...course,
          img: images[index % images.length],
        }));

        setCourses(updatedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddCard = (index) => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const productId = courses[index].id;
      sessionStorage.setItem("id", productId);
      navigate("/cart");
    } else {
      setShowPopup(true);
    }
  };
  const handledirectCart = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      // const productId = courses[index].id;
      // sessionStorage.setItem("id", productId);
      navigate("/pay-direct");
    } else {
      setShowPopup(true);
    }
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      console.warn("Invalid amount passed to formatCurrency:", amount);
      return "₹0"; // Default fallback for invalid values
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="flex flex-col items-center mb-10 py-10 px-5">
      <h1 className="text-center text-4xl font-bold text-black mb-8">
        Course Curriculum
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration={Math.min(2000, 1000 + index * 100)} // Cap duration
              data-aos-delay={index * 100}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-56 object-cover rounded-t-lg transition-transform duration-500"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-blue-800 mb-4">
                  {course.title}
                </h2>
                <ul className="text-sm text-gray-700 space-y-2 mb-4">
                  {course.details.map((detail, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span> {detail}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600 mr-2">
                    {formatCurrency(course.price)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatCurrency(course.discount)}
                  </span>
                </div>
                <div className="flex flex-col space-y-3">
                  <a href="mailto:support-care@thetradinghubacademy.com">
                    <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 w-full">
                      More Details
                    </button>
                  </a>
                  <button
                    className="bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 w-full"
                    onClick={() => handleAddCard(index)}
                  >
                    Enrol Now ➡
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
      <figure className="relative h-96 w-full mt-10">
        <img
          src="https://wallpapers.com/images/hd/trading-wallpaper-ynfqhj74ml8p96ca.jpg"
          alt="nature-image"
          className="h-full w-full rounded-xl object-cover object-center"
        />
        <figcaption className="rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 bg-opacity-75 saturate-200 backdrop-blur-md sm:w-[90%] md:w-[80%] lg:w-[calc(100%-2rem)]">
          <div className="w-full h-max rounded py-2.5 flex flex-col sm:flex-row justify-between items-center px-4">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h6 className="font-sans antialiased font-bold text-base sm:text-lg lg:text-xl text-current">
                TradingHubAcademy
              </h6>
              <p className="font-sans antialiased text-base mt-1 text-stone-600"></p>
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <p className="font-sans antialiased text-base text-current font-bold mb-2">
                Click below
              </p>
              <button
                className="bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
                onClick={handledirectCart} // Change the index as needed
              >
                For Direct Pay Click Here ➡
              </button>
            </div>
          </div>
        </figcaption>
      </figure>

    </section>
  );
}

export default CourseCurriculum;