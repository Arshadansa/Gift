import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import logo from "@assets/img/logo/logo.svg";
import pay from "@assets/img/footer/footer-pay.png";
import social_data from "@/data/social-data";
import { Email, Location } from "@/svg";
import SocialMedia from "@/components/SocialMedial/SocialMedia";
const Footer = ({
  style_2 = false,
  style_3 = false,
  primary_style = false,
}) => {
  return (
    <footer>
      <div
        className={`tp-footer-area ${
          primary_style
            ? "tp-footer-style-2 tp-footer-style-primary tp-footer-style-6"
            : ""
        } ${
          style_2
            ? "tp-footer-style-2"
            : style_3
            ? "tp-footer-style-2 tp-footer-style-3"
            : ""
        }`}
        style={{ backgroundColor: "#990100", color: "#FFFFFF" }}
      >
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image src={logo} alt="logo" />
                      </Link>
                    </div>

                    <div className="tp-footer-social">
                      <SocialMedia/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4
                    className="tp-footer-widget-title"
                    style={{ color: "#FFFFFF" }}
                  >
                    My Account
                  </h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a
                          href="profile"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          } // Change to black on hover
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          } // Revert to white on leave
                        >
                          Track Orders
                        </a>
                      </li>
                      <li>
                        <a
                          href="profile"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          My Account
                        </a>
                      </li>
                      <li>
                        <a
                          href="profile"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          Order History
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4
                    className="tp-footer-widget-title"
                    style={{ color: "#FFFFFF" }}
                  >
                    Information
                  </h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a
                          href="privacypolicy"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="termsandconditions"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          Terms & Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          href="refundpolicy"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          Refund Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="contact"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          Contact Us
                        </a>
                      </li>
                      {/* <li>
                        <a
                          href="contact"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          About Us
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4
                    className="tp-footer-widget-title"
                    style={{ color: "#FFFFFF" }}
                  >
                    Talk To Us
                  </h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <span style={{ color: "#FFFFFF" }}>
                        Got Questions? Call us
                      </span>
                      <h4>
                        <a
                          href="tel:999-606-10-15"
                          style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#FFFFFF")
                          }
                        >
                          +(91) 9996061015
                        </a>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="mailto:ankit@mysweetwishes.com"
                              style={{
                                color: "#FFFFFF",
                                transition: "color 0.3s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#000000")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "#FFFFFF")
                              }
                            >
                              ankit@mysweetwishes.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://maps.app.goo.gl/5RLdim7adFE5E8Ri7"
                              target="_blank"
                              style={{
                                color: "#FFFFFF",
                                transition: "color 0.3s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#000000")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "#FFFFFF")
                              }
                            >
                              83, Mahaveer Complex, Kurukshetra <br /> 136118
                              Haryana
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p style={{ color: "#FFFFFF" }}>
                      © {new Date().getFullYear()} All Rights Reserved | Fly
                      Your Tech by
                      <Link
                        href="/"
                        style={{ color: "#FFFFFF", transition: "color 0.3s" }}
                        onMouseEnter={(e) => (e.target.style.color = "#000000")}
                        onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
                      >
                        ❤
                      </Link>
                      .
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-footer-payment text-md-end">
                    <p>
                      <Image src={pay} alt="pay" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
