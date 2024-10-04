import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useConfirmEmailMutation } from "@/redux/features/auth/authApi"; // Updated import
import { notifyError, notifySuccess } from "@/utils/toast";
import ErrorMsg from "../common/error-msg";
import { useRouter } from "next/router";
import LoginShapes from "../login-register/login-shapes";
import Link from "next/link";

const ResetArea = () => {
  const router = useRouter();

  // Validation schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    otp: Yup.string()
      .required("OTP is required")
      .length(6, "OTP must be exactly 6 digits"),
    password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .required("Confirm new password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [confirmEmail] = useConfirmEmailMutation(); // Updated to use mutation

  const onSubmit = async (data) => {
    try {
      // Send the form data according to the required JSON structure
      const response = await confirmEmail({
        data: {
          email: data.email,
          otp: data.otp,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      }).unwrap();

      notifySuccess(response.message);
      reset(); // Reset the form
      router.push("/login"); // Redirect to login on successful password reset
    } catch (error) {
      notifyError(error.data?.message || "Failed to reset password.");
    }
  };

  return (
    <section className="tp-login-area pb-140 p-relative z-index-1 fix">
      <LoginShapes />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="tp-login-wrapper">
              <div className="tp-login-top text-center mb-30">
                <h3 className="tp-login-title">New Passowrd</h3>
                <p>
                  Enter your email address, otp and new password to request
                  password reset.
                </p>
              </div>
              <div className="tp-login-option">
                {/* form start */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email Input */}
                  <div className="tp-login-input-box">
                    <div className="tp-login-input">
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <ErrorMsg msg={errors.email?.message} />
                  </div>

                  {/* OTP Input */}
                  <div className="tp-login-input-box">
                    <div className="tp-login-input">
                      <input
                        {...register("otp")}
                        id="otp"
                        type="text"
                        placeholder="OTP"
                      />
                    </div>
                    <ErrorMsg msg={errors.otp?.message} />
                  </div>

                  {/* New Password Input */}
                  <div className="tp-login-input-box">
                    <div className="tp-login-input">
                      <input
                        {...register("password")}
                        id="password"
                        type="password"
                        placeholder="New Password"
                      />
                    </div>
                    <ErrorMsg msg={errors.password?.message} />
                  </div>

                  {/* Confirm New Password Input */}
                  <div className="tp-login-input-box">
                    <div className="tp-login-input">
                      <input
                        {...register("password_confirmation")}
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm New Password"
                      />
                    </div>
                    <ErrorMsg msg={errors.password_confirmation?.message} />
                  </div>

                  <button
                    type="submit"
                    className="tp-login-btn w-100"
                    style={{ backgroundColor: "#000000" }} // Default background color
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#990100")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#000000")
                    }
                  >
                    Reset Password
                  </button>
                </form>
                {/* form end */}
                <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                  <div className="tp-login-forgot">
                    <span>
                      Remeber Passowrd? <Link href="/login"> Login</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetArea;
