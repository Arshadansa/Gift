import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import { useDispatch } from "react-redux"; // Use dispatch for actions

// Internal imports
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { userLoggedIn } from "@/redux/features/auth/authSlice"; // Import the action

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch
  const { redirect } = router.query;
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: !isHovered ? "#990100" : "#000000", // Change bg color on hover
    color: "#FFFFFF", // Text color remains white
    width: "30%", // Full width
    border: "none", // Remove border
    padding: "10px", // Padding for better spacing
    cursor: "pointer", // Change cursor to pointer on hover
    transition: "background-color 0.3s ease", // Smooth transition effect
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap(); // Using unwrap to get the result or throw an error

      // Check if the login was successful
      if (result.status) {
        // Check if user is authenticated
        notifySuccess("Login successfully");

        const userInfo = {
          accessToken: result.access_token, // Ensure this exists in your response
          user: result.user,
        };

        // Store user info in cookies
        Cookies.set("userInfo", JSON.stringify(userInfo), {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        // Dispatch the login action
        dispatch(userLoggedIn(userInfo));

        // Redirect the user
        router.push(redirect || "/");
      } else {
        notifyError("Login failed");
      }
    } catch (error) {
      notifyError(error?.data?.message || "Login failed");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="shofy@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `Password is required!` })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input id="remember" type="checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div className="">
          <Link
            style={{
              color: "#990100",
              fontSize: "16px",
              textDecoration: "underline",
            }}
            href="/forgot"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="tp-login-bottom">
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="tp-login-btn w-100"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
