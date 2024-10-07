import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
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

  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // State to track hovered item

  return (
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
       style={{color:"#000000"}}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
        onClick={() => handleActive("setting")} // Call handleActive on click
      >
        Setting
      </span>
      <ul
        style={{ fontWeight: "bold" }}
        className={active === "setting" ? "tp-setting-list-open" : ""}
      >
        <li>
          <Link
            onMouseEnter={() => setHoveredItem("profile")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleActive("setting")}
            style={{ color: hoveredItem === "profile" ? "#990100" : "inherit" }}
            href="/profile"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            onMouseEnter={() => setHoveredItem("cart")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleActive("setting")}
            style={{ color: hoveredItem === "cart" ? "#990100" : "inherit" }}
            href="/cart"
          >
            Cart
          </Link>
        </li>
        <li>
          {!user ? (
            <Link
              onMouseEnter={() => setHoveredItem("login")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleActive("setting")}
              style={{ color: hoveredItem === "login" ? "#990100" : "inherit" }} // Change color on hover
              href="/login"
              className="cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <span
              onMouseEnter={() => setHoveredItem("login")}
              onMouseLeave={() => setHoveredItem(null)}
            
              style={{ color: hoveredItem === "login" ? "#990100" : "inherit" }} // Change color on hover
              onClick={handleLogout}
              className="cursor-pointer"
            >
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
  const [active, setActive] = useState(""); // State for active menu
  const user = useSelector((state) => state.auth.user); // Accessing the user state

  const handleActive = (type) => {
    setActive((prev) => (type === prev ? "" : type)); // Toggle active menu
  };

  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <ProfileSetting active={active} handleActive={handleActive} user={user} />
    </div>
  );
};

export default HeaderTopRight;
