import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import CourseCurriculum from "../components/CourseCurriculum";
import TestimonialSection from "../components/Testimonials";
import LoginPopup from "../components/LoginPopup";
import Footer2 from "../components/Footer2";
import SolutionCard from "../components/SolutionCard";
import Cookies from "js-cookie";
import { useLoginContext } from "../context/LoginContext";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Spinner from "../components/Spinner";

export default function Home() {
  const { setIsLoggedIn, showPopup, setShowPopup, setUser, loading } =
    useLoginContext();

  const curriculumRef = useRef(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const decodedUser = jwtDecode(userCookie);
      setUser(decodedUser.user); // Parse and set user data from cookie
      setIsLoggedIn(true);
      setShowPopup(false);
    } else {
      setShowPopup(true);
      setIsLoggedIn(false);
    }
  }, []);

  const location = useLocation();

  // Function to scroll to CourseCurriculum
  const handleScrollToCurriculum = () => {
    if (curriculumRef.current) {
      curriculumRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the top
      });
    }
  };

  return (
    <div>
      {location.pathname !== "/cart" && (
        <div>
          <Header />
          {showPopup && <LoginPopup />}
          <HeroSection onScrollToCurriculum={handleScrollToCurriculum} />{" "}
          {/* Pass handler */}
          <SolutionCard />
          <div ref={curriculumRef}>
            <CourseCurriculum />
          </div>
          <FeaturesSection />
          <TestimonialSection />
          <Footer />
          <Footer2 />
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
}
