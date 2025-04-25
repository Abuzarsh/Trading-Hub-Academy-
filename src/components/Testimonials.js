import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function TestimonialSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);
  return (
    <div className="testimonial-container py-12 px-4 sm:px-8 lg:px-16">
      <section className="bg-white py-16 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Achievements
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-screen-xl mx-auto">
          {/* Achievement 1 */}
          <div
            data-aos="fade-up-left"
            data-aos-duration="2000"
            data-aos-delay="100"
            className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-1/3 lg:w-1/4 text-center"
          >
            <i className="fas fa-user-graduate text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className="text-lg">Students Enrolled</p>
          </div>
          {/* Achievement 2 */}
          <div
            data-aos="fade-up-left"
            data-aos-duration="2000"
            data-aos-delay="200"
            className="p-6 bg-gradient-to-br from-blue-300 to-blue-500 text-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-1/3 lg:w-1/4 text-center"
          >
            <i className="fas fa-project-diagram text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="text-lg">Successful Projects</p>
          </div>
          {/* Achievement 3 */}
          <div
            data-aos="fade-up-left"
            data-aos-duration="2000"
            data-aos-delay="300"
            className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-1/3 lg:w-1/4 text-center"
          >
            <i className="fas fa-star text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
            <p className="text-lg">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* <h3 className="testimonial-header text-3xl font-bold text-center text-gray-800 mb-6">
        Testimonials
      </h3>
      <p className="testimonial-description text-center text-gray-600 max-w-screen-md mx-auto mb-10">
        Hear what our students have to say about their experience with us. Their
        journey to success started here!
      </p> */}
      <div className="testimonial-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-screen-xl mx-auto">
        {/* Testimonial 1 */}
        {/* <div className="testimonial-card bg-white shadow-lg p-6 rounded-lg text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            alt="Maria Smantha"
            className="testimonial-image w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h5 className="testimonial-name text-lg font-semibold text-gray-800">
            Maria Smantha
          </h5>
          <h6 className="testimonial-role text-sm text-gray-500">
            Web Developer
          </h6>
          <p className="testimonial-quote text-gray-600 italic mt-4">
            <span className="quote-icon text-gray-400 text-2xl">“</span>
            The skills I gained here helped me secure my dream job as a web
            developer. Highly recommended!
          </p>
          <div className="testimonial-rating text-yellow-500 mt-4">
            ★★★★★
          </div>
        </div> */}

        {/* Testimonial 2 */}
        {/* <div className="testimonial-card bg-white shadow-lg p-6 rounded-lg text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
            alt="Lisa Cudrow"
            className="testimonial-image w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h5 className="testimonial-name text-lg font-semibold text-gray-800">
            Lisa Cudrow
          </h5>
          <h6 className="testimonial-role text-sm text-gray-500">
            Graphic Designer
          </h6>
          <p className="testimonial-quote text-gray-600 italic mt-4">
            <span className="quote-icon text-gray-400 text-2xl">“</span>
            This academy transformed my design skills. The hands-on projects
            were amazing!
          </p>
          <div className="testimonial-rating text-yellow-500 mt-4">
            ★★★★★
          </div>
        </div> */}

        {/* Testimonial 3 */}
        {/* <div className="testimonial-card bg-white shadow-lg p-6 rounded-lg text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
            alt="John Smith"
            className="testimonial-image w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h5 className="testimonial-name text-lg font-semibold text-gray-800">
            John Smith
          </h5>
          <h6 className="testimonial-role text-sm text-gray-500">
            Marketing Specialist
          </h6>
          <p className="testimonial-quote text-gray-600 italic mt-4">
            <span className="quote-icon text-gray-400 text-2xl">“</span>
            The strategies I learned boosted my career to new heights. Highly
            recommended for marketing enthusiasts!
          </p>
          <div className="testimonial-rating text-yellow-500 mt-4">
            ★★★★☆
          </div>
        </div> */}
      </div>
    </div>
  );
}
