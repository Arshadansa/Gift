import React from "react";
import { useRouter } from "next/router";

const ContactBreadcrumb = () => {
  const router = useRouter();
  const isContactPage = router.pathname === "/contact"; // Check if current page is Contact
  const isAboutPage = router.pathname === "/aboutus"; // Check if current page is About

  return (
    <section className="breadcrumb__area include-bg text-center pt-55">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <h3 className="breadcrumb__title">
                {isContactPage ? "Get in Touch" : isAboutPage ? "Learn About Us" : "Keep In Touch with Us"}
              </h3>
              <div className="breadcrumb__list">
                <span
                  style={{ color: "#000000", transition: "color 0.1s" }} // Initial color
                  onMouseEnter={(e) => (e.target.style.color = "#990100")} // Change color on hover
                  onMouseLeave={(e) => (e.target.style.color = "#000000")} // Revert color on hover out
                >
                  <a href="/">Home</a>
                </span>
                <span>{isAboutPage ? "About" : "Contact"}</span> {/* Display "About" or "Contact" based on the page */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;
