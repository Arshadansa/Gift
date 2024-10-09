import Link from "next/link";
import React, { useState } from "react";
import ForgotForm from "../forms/forgot-form";
import LoginShapes from "./login-shapes";

const ForgotArea = () => {
  const [linkColor, setLinkColor] = useState("#000000"); // Initial color

  return (
    <section className="tp-login-area pb-140 p-relative z-index-1 fix">
      <LoginShapes />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="tp-login-wrapper">
              <div className="tp-login-top text-center mb-30">
                <h3 className="tp-login-title">Reset Passowrd</h3>
                <p>Enter your email address to request password reset.</p>
              </div>
              <div className="tp-login-option">
                {/* form start */}
                <ForgotForm />
                {/* form end */}
                <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                  <div className="">
                    <span>
                      Remember Password?{" "}
                      <Link
                        href="/login"
                        style={{ color: linkColor, transition: "color 0.3s",fontSize:"14px" }} // Apply dynamic color
                        onMouseEnter={() => setLinkColor("#990100")} // Change color on hover
                        onMouseLeave={() => setLinkColor("#000000")} // Revert color on hover out
                      >
                        Login
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotArea;
