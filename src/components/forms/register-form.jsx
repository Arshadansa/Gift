import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import Cookies from "js-cookie";  // Assuming you are using Cookies to handle tokens

// Validation Schema
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required!"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required!")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed."),
});

const RegisterForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPass, setShowPass] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  
  // Get token from cookies (if applicable)
  const token = Cookies.get("accessToken"); // Adjust this based on how you store the token

  const onSubmit = async (data) => {
    try {
      // Call registerUser with both form data and token
      const result = await registerUser({ data, token }).unwrap(); 
      
      // Notify user of success
      notifySuccess(result?.message || "Registration successful!");
      reset();
    } catch (error) {
      // Handle registration error
      notifyError(error?.data?.message || "Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Input */}
      <div className="tp-login-input-box">
        <div className="tp-login-input">
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="tp-login-input-title">
          <label htmlFor="name">Your Name</label>
        </div>
        <ErrorMsg msg={errors.name?.message} />
      </div>

      {/* Email Input */}
      <div className="tp-login-input-box">
        <div className="tp-login-input">
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="johndoe@example.com"
          />
        </div>
        <div className="tp-login-input-title">
          <label htmlFor="email">Your Email</label>
        </div>
        <ErrorMsg msg={errors.email?.message} />
      </div>

      {/* Password Input */}
      <div className="tp-login-input-box">
        <div className="p-relative">
          <div className="tp-login-input">
            <input
              {...register("password")}
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Min. 6 characters"
            />
          </div>
          <div className="tp-login-input-eye">
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? <CloseEye /> : <OpenEye />}
            </span>
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <ErrorMsg msg={errors.password?.message} />
      </div>

      {/* Confirm Password Input */}
      <div className="tp-login-input-box">
        <div className="p-relative">
          <div className="tp-login-input">
            <input
              {...register("password_confirmation")}
              id="password_confirmation"
              type={showPass ? "text" : "password"}
              placeholder="Confirm your password"
            />
          </div>
          <div className="tp-login-input-eye">
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? <CloseEye /> : <OpenEye />}
            </span>
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="password_confirmation">Confirm Password</label>
          </div>
        </div>
        <ErrorMsg msg={errors.password_confirmation?.message} />
      </div>

      {/* Remember Checkbox */}
      <div className="tp-login-suggestions mb-20">
        <div className="tp-login-remember">
          <input
            {...register("remember")}
            id="remember"
            type="checkbox"
          />
          <label htmlFor="remember">
            I accept the terms of the Service &{" "}
            <a href="#">Privacy Policy</a>.
          </label>
        </div>
        <ErrorMsg msg={errors.remember?.message} />
      </div>

      {/* Submit Button */}
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100" disabled={isLoading || isSubmitting}>
          {isLoading || isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
