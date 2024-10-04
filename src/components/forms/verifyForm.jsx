import Link from "next/link";
import React from "react";
import ForgotForm from "../forms/forgot-form";
import LoginShapes from "../login-register/login-shapes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useConfirmForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ErrorMsg from "../common/error-msg";
import { useRouter } from "next/router";

const VerifyArea = () => {
  const router = useRouter();

  // Validation schema
  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    otp: Yup.string().required("OTP is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [verifyEmail] = useConfirmForgotPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const response = await verifyEmail({
        email: data.email,
        otp: data.otp,
      }).unwrap();

      if (response.message === "OTP verified successfully") {
        notifySuccess(response.message);
        router.push("resetpassword"); // Navigate to reset password page
      } else {
        notifyError(response.message);
      }
    } catch (error) {
      notifyError(error.data?.message || "Failed to verify OTP.");
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
                <h3 className="tp-login-title">Verify Otp</h3>
                <p>Enter your email address and otp to request password reset.</p>
              </div>
              <div className="tp-login-option">
                {/* form start */}
                <form
                  className="tp-login-input-box"
                  onSubmit={handleSubmit(onSubmit)}
                >
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

                  <div className="tp-login-input-box">
                    <div className="tp-login-input">
                      <input
                        {...register("otp")}
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                      />
                    </div>
                    <ErrorMsg msg={errors.otp?.message} />
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
                    } // Reset to default color on mouse out
                  >
                    Verify Otp
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

export default VerifyArea;
