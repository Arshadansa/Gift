import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ErrorMsg from "../common/error-msg";
import { useRouter } from "next/router";

const EmailForm = () => {
  const router = useRouter();

  // Validation schema
  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword({ email: data.email }).unwrap();
      if (response.message === "OTP generated successfully") {
        notifySuccess(response.message);
        router.push("verify"); // Navigate to OTP verification page
      }
    } catch (error) {
      notifyError(error.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-box">
        <div className="tp-login-input">
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <ErrorMsg msg={errors.email?.message} />
      </div>
      <button
        type="submit"
        className="tp-login-btn w-100"
        style={{ backgroundColor: "#000000" }} // Default background color
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#990100")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000000")} // Reset to default color on mouse out
      >
        Send Mail
      </button>
    </form>
  );
};

export default EmailForm;
