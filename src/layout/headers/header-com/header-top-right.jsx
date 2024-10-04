import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

function ProfileSetting({ active, handleActive }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user); // Accessing the user state

  const handleLogout = () => {
    dispatch(userLoggedOut());
    Cookies.remove("userInfo"); 
    router.push("/"); 
  };

  return (
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
        onClick={() => handleActive("setting")}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
        style={{ color: "white" }}
      >
        Setting
      </span>
      <ul className={active === "setting" ? "tp-setting-list-open" : ""}>
        <li onClick={() => handleActive("setting")}>
          <Link href="/profile">My Profile</Link>
        </li>
        <li onClick={() => handleActive("setting")}>
          <Link href="/cart">Cart</Link>
        </li>
        <li onClick={() => handleActive("setting")}>
          {!user ? (
            <Link href="/login" className="cursor-pointer">
              Login
            </Link>
          ) : (
            <span onClick={handleLogout} className="cursor-pointer">
              Logout
            </span>
          )}
        </li>
      </ul>
    </div>
  );
}

// HeaderTopRight Component
const HeaderTopRight = () => {
  const [active, setIsActive] = useState("");
  const user = useSelector((state) => state.auth.user); // Accessing the user state

  const handleActive = (type) => {
    setIsActive((prev) => (type === prev ? "" : type));
  };

  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <ProfileSetting active={active} handleActive={handleActive} user={user} />
    </div>
  );
};

export default HeaderTopRight;
