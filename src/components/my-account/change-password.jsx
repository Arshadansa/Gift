import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// internal imports
import ErrorMsg from "../common/error-msg";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// Validation schema
const schema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required!"),
  newPassword: Yup.string()
    .required("New password is required!")
    .min(6, "New password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password!"),
});

const ChangePassword = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [changePassword] = useChangePasswordMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // on submit
  const onSubmit = (data) => {
    changePassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
      new_password_confirmation: data.confirmPassword,
      accessToken, // Pass the access token as well
    }).then((result) => {
      if (result?.error) {
        notifyError(result?.error?.data?.message || "Password change failed!");
      } else {
        notifySuccess(result?.data?.message || "Password changed successfully!");
      }
    });
    reset();
  };

  return (
    <div className="profile__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xxl-12">
            <div className="tp-profile-input-box">
              <div className="tp-contact-input">
                <input
                  {...register("currentPassword", {
                    required: "Current password is required!",
                  })}
                  name="currentPassword"
                  id="currentPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="currentPassword">Current Password</label>
              </div>
              <ErrorMsg msg={errors.currentPassword?.message} />
            </div>
          </div>

          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("newPassword", {
                    required: "New password is required!",
                  })}
                  name="newPassword"
                  id="newPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="newPassword">New Password</label>
              </div>
              <ErrorMsg msg={errors.newPassword?.message} />
            </div>
          </div>

          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="confirmPassword">Confirm New Password</label>
              </div>
              <ErrorMsg msg={errors.confirmPassword?.message} />
            </div>
          </div>

          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
