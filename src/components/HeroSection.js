import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function HeroSection({ onScrollToCurriculum }) {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);
  return (
    <>
      <section
        style={{
          backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/025/751/345/non_2x/business-growth-wallpaper-with-the-glowing-bar-chart-static-and-up-arrow-stock-market-growth-in-futuristic-technology-style-graphic-of-successful-financial-development-on-the-dark-background-vector.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative grid grid-cols-1 md:grid-cols-2 h-screen max-h-[500px] rounded-3xl overflow-hidden"
      >
        {/* Left Grid - Text Content */}
        <div className="text-white p-6 md:p-10 z-10 flex flex-col justify-center">
          <h1
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#fff] mb-4"
          >
            Trading Hub Academy Classes
          </h1>

          {/* Paragraph hidden on mobile */}
          <p
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-delay="200"
            className="text-sm sm:text-base md:text-lg font-light text-white mb-6 text-left  sm:block"
          >
            Take your productivity to the next level while maximizing your
            happiness and life satisfaction. Fully updated from ground up with
            new worksheets and now available in Hindi with English subtitles,
            this course teaches you how to effectively plan your day, track your
            time, achieve your goals, and live your dream life. Start the
            transformation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center">
            <button className="bg-gradient-to-r from-[#2596be] to-[#0b3154] text-white px-6 py-3 rounded-full shadow-lg hover:from-[#0b3154] hover:to-[#041c34] transition-all duration-300 w-1/2 sm:w-auto">
              Join Now
            </button>

            {/* Link for See Curriculum Button */}
            <button
              onClick={onScrollToCurriculum}
              className="bg-gradient-to-r from-[#2596be] to-[#04142c] text-white px-6 py-3 rounded-full shadow-lg hover:from-[#0b3154] hover:to-[#0b3154] transition-all duration-300 w-1/2 sm:w-auto"
            >
              See Curriculum
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
