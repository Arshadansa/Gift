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

  // Fetch user info using RTK query
  const { data: userInfo, isLoading, error } = useGetUserQuery();

  useEffect(() => {
    // Sync user state with Redux when component mounts
    if (userInfo) {
      const { user, token } = userInfo;
      if (user && token) {
        dispatch(userLoggedIn({ user, accessToken: token }));
      }
    }
  }, [userInfo, dispatch]);

  const handleLogout = () => {
    dispatch(userLoggedOut());
    Cookies.remove("userInfo"); 
    router.push('/');
  };
  

  if (isLoading) return <div>Loading...</div>; // Optional loading state
  if (error) return <div>Error fetching user data</div>; // Error state

  const user = userInfo?.user; // Extract user object

  return (
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
        onClick={() => handleActive("setting")}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
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
            <a onClick={handleLogout} className="cursor-pointer">
              Logout
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

// HeaderTopRight Component
const HeaderTopRight = () => {
  const [active, setIsActive] = useState("");
  const handleActive = (type) => {
    setIsActive((prev) => (type === prev ? "" : type));
  };

  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <ProfileSetting active={active} handleActive={handleActive} />
    </div>
  );
};

export default HeaderTopRight;
