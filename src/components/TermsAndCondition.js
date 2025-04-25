import React from "react";

const TermsAndCondition = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-300 to-blue-500 text-white py-10 shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-lg font-light">
            Welcome to The Trading Hub Academy
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white p-10 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Please Read Carefully
          </h2>

          <section className="space-y-10">
            {[
              {
                title: "1. General Information",
                content:
                  "This Site is owned and operated by The Trading Hub Academy, in partnership with Growmore Finance. The Site provides users with an online platform to browse and enroll in trading-related courses. These Terms govern your use of the Site and any associated services provided by The Trading Hub Academy.",
                icon: "fas fa-info-circle",
              },
              {
                title: "2. Account Registration",
                content:
                  "To register for a course, you must create an account on the Site. By creating an account, you agree to: Provide accurate and complete information during the registration process.Use a valid Google account for easy sign-up or an email address to receive a One-Time Password (OTP) for verification purposes.Keep your account login details secure. You are responsible for maintaining the confidentiality of your account and all activity under it.Google Account Sign-in You may sign up using your Google account. If you choose this option, you authorize The Trading Hub Academy to access your basic profile information, which will be used for registration and course enrollment.Email & OTP Registration If you prefer, you can sign up using your email address. Upon entering your email, we will send you an OTP to verify your identity. You must enter the OTP to complete your registration.",
                icon: "fas fa-user-plus",
              },
              {
                title: "3. Course Enrollment",
                content:
                  "Once you have successfully created an account, you can browse through various courses available on The Trading Hub Academy. When you select a course, you will be directed to the payment page.",
                icon: "fas fa-book-reader",
              },
              {
                title: "4. Payment",
                content:
                  "Upon selecting a course, you will proceed to the payment page, where you will be required to complete payment using an approved payment method. Payments are processed securely through our payment partners. By completing the payment process, you confirm that you have reviewed and accepted the course pricing, terms, and all associated fees.Payment Methods:Payments can be made using major credit/debit cards or other accepted payment methods. The exact payment options will be listed on the payment page.",
                icon: "fas fa-credit-card",
              },
              {
                title: "5. Access to Course Content",
                content:
                  "After completing payment, you will gain access to the course materials. You may access the course through your registered account at any time, subject to the specific terms of the course. Access to the course is granted only after full payment is received.",
                icon: "fas fa-folder-open",
              },
              {
                title: "6. Intellectual Property",
                content:
                  "All content provided on The Trading Hub Academy (including but not limited to course materials, videos, PDFs, and other educational resources) is the property of The Trading Hub Academy or its partners, including Growmore Finance. All rights are reserved. You may not copy, reproduce, or distribute any content without prior written permission from The Trading Hub Academy.",
                icon: "fas fa-shield-alt",
              },
              {
                title: "7. Refunds and Cancellations",
                content:
                  "Refunds are subject to the terms and conditions of each course. Please refer to the course-specific refund policy before making a purchase. Generally, refunds will not be provided once a course has been accessed or after the expiration of a refund period.",
                icon: "fas fa-exchange-alt",
              },
              {
                title: "8. Privacy and Data Protection",
                content:
                  "We value your privacy and are committed to protecting your personal information. When you sign up for the Site, you agree to the collection, use, and processing of your personal data as outlined in our [Privacy Policy]. This may include the use of your Google account or email for registration, and the OTP verification process. We will never sell your personal data to third parties.",
                icon: "fas fa-user-shield",
              },
              {
                title: "9. Limitation of Liability",
                content:
                  "The Trading Hub Academy, in partnership with Growmore Finance, is not liable for any damages arising out of the use or inability to use the Site or the course materials. This includes but is not limited to direct, indirect, incidental, punitive, and consequential damages.",
                icon: "fas fa-exclamation-triangle",
              },
              {
                title: "10. Changes to Terms",
                content:
                  "notice. Any changes will be reflected on this page with the updated effective date. It is your responsibility to review these Terms regularly.",
                icon: "fas fa-edit",
              },
              {
                title: "11. Governing Law",
                content:
                  "These Terms and Conditions are governed by and construed in accordance with the laws of India, and any disputes will be resolved in the appropriate courts of India",
                icon: "fas fa-gavel",
              },
              {
                title: "12. Contact Information",
                content: (
                  <>
                    <ul className="list-none text-gray-700 mt-2 space-y-2">
                      <li>
                        <div className="flex lg:flex-row md:flex-row flex-col items-center">
                          <div>
                            <i className="fas fa-envelope bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text mr-2"></i>
                            <span>Email: </span>
                          </div>
                          <a
                            href="mailto:support-care@thetradinghubacademy.com"
                            className="text-blue-500 underline ml-1"
                          >
                            support-care@thetradinghubacademy.com
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <i className="fas fa-phone bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text mr-2"></i>
                          <span>Phone: </span>
                          <a
                            href="tel:+918928720003"
                            className="text-blue-500 underline ml-1"
                          >
                            +91 8928720003
                          </a>
                        </div>
                      </li>
                    </ul>
                  </>
                ),
                icon: "fas fa-phone",
              },
            ].map(({ title, content, icon }, index) => (
              <div key={index} className="flex items-start space-x-4 mb-6">
                <div className="text-3xl bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">
                  <i className={icon}></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-start text-blue-600">
                    {title}
                  </h3>
                  <p className="text-gray-700 mt-2">{content}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsAndCondition;
