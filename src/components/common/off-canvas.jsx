import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import { CloseTwo } from "@/svg";
import logo from "@assets/img/logo/logo.png";
import contact_img from "@assets/img/icon/contact.png";
import language_img from "@assets/img/icon/language-flag.png";
import MobileCategory from "@/layout/headers/header-com/mobile-category";
import MobileMenus from "./mobile-menus";

const OffCanvas = ({
  isOffCanvasOpen,
  setIsCanvasOpen,
  categoryType = "electronics",
}) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);

  // handle language active
  const handleLanguageActive = () => {
    setIsLanguageActive(!isLanguageActive);
    setIsCurrencyActive(false);
  };
  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive);
    setIsLanguageActive(false);
  };
  return (
    <>
      <div 
       style={{backgroundColor:"#990100"}}
        className={`offcanvas__area offcanvas__radius ${
          isOffCanvasOpen ? "offcanvas-opened" : ""
        }`}
      >
        <div className="offcanvas__wrapper">
          <div className="offcanvas__close">
            <button
              onClick={() => setIsCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
            >
              <CloseTwo />
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/">
                  <Image
                    style={{ height: "100px", width: "100px",objectFit:"cover" }}
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>
            </div>

            <div className="tp-main-menu-mobile fix d-lg-none mb-40">
              <MobileMenus />
            </div>
          </div>
          <div className="offcanvas__bottom"></div>
        </div>
      </div>
      {/* body overlay start */}
      <div
        onClick={() => setIsCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
      {/* body overlay end */}
    </>
  );
};

export default OffCanvas;
