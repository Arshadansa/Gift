import { useGetUserQuery } from "@/redux/features/auth/authApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Menu, User } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import Loader from "@/components/loader/loader";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";
import { PiUserCircleLight } from "react-icons/pi";

const HeaderMainRight = ({ setIsCanvasOpen }) => {
  const user = useSelector((state) => state.auth.user); // Accessing the user state
  const { quantity } = useCartInfo();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(false); // State to track hovered item

  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          <div className="" style={{ marginRight: "8px" }}>
            <span>
              {user?.imageURL ? (
                <Link href="/profile">
                  <PiUserCircleLight
                    style={{
                      fontWeight: "lighter",
                      color: "#fff",
                      cursor: "pointer", // Changes cursor to pointer on hover
                    }}
                    size={34}
                  />
                </Link>
              ) : user?.name ? (
                <Link href="/profile">
                  <h2
                    style={{ color: "white" }}
                    className="text-uppercase login_text"
                  >
                    {user.name[0]}{" "}
                    {/* Display the first letter of user's name */}
                  </h2>
                </Link>
              ) : (
                <PiUserCircleLight
                  style={{ fontWeight: "lighter", color: "#fff",  }}
                  size={36}
                />
              )}
            </span>
          </div>
          <div className="tp-header-login-content d-none d-xl-block">
            {!user ? (
              <>
                <Link href="/login">
                  <span style={{ color: "white" }}>Hello,</span>
                </Link>
                <div className="tp-header-login-title">
                  <Link style={{ color: "white" }} href="/login">
                    Sign In
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span style={{ color: "white" }}>Hello, {user.name}</span>
                <div className="tp-header-login-title">
                  <Link style={{ color: "white" }} href="/profile">
                    Your Account
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="tp-header-action d-flex align-items-center ml-40">
        <div className="tp-header-action-item">
          <button
            onClick={() => dispatch(openCartMini())}
            type="button"
            onMouseEnter={() => setHoveredItem(true)}
            onMouseLeave={() => setHoveredItem(false)}
            style={{ color: hoveredItem ? "#000000" : "#fff" }}
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span style={{backgroundColor:"#990100",borderColor:"white"}} className="tp-header-action-badge">{quantity}</span>
          </button>
        </div>
        <div className="tp-header-action-item d-lg-none">
          <button
            onClick={() => setIsCanvasOpen(true)}
            type="button"
            className="tp-header-action-btn tp-offcanvas-open-btn"
          >
            <Menu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMainRight;
