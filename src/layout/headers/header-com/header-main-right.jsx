import { useGetUserQuery } from "@/redux/features/auth/authApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Menu, User } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import Loader from "@/components/loader/loader";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";

const HeaderMainRight = ({ setIsCanvasOpen }) => {
  const user = useSelector((state) => state.auth.user); // Accessing the user state
  const { quantity } = useCartInfo();
  const dispatch = useDispatch();

  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          <div className="tp-header-login-icon">
            <span>
              {user?.imageURL ? (
                <Link href="/profile">
                  <Image
                    src={user.imageURL}
                    alt="User Profile Image"
                    width={35}
                    height={35}
                    className="rounded-full" // Optional: Adds round shape to image
                  />
                </Link>
              ) : user?.name ? (
                <Link href="/profile">
                  <h2 className="text-uppercase login_text">
                    {user.name[0]}{" "}
                    {/* Display the first letter of user's name */}
                  </h2>
                </Link>
              ) : (
                <User />
              )}
            </span>
          </div>
          <div className="tp-header-login-content d-none d-xl-block">
            {!user ? (
              <>
                <Link href="/login">
                  <span>Hello,</span>
                </Link>
                <div className="tp-header-login-title">
                  <Link href="/login">Sign In</Link>
                </div>
              </>
            ) : (
              <>
                <span>Hello, {user.name}</span>
                <div className="tp-header-login-title">
                  <Link href="/profile">Your Account</Link>
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
            style={{border:"solid 1px white"}}
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span className="tp-header-action-badge">{quantity}</span>
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
