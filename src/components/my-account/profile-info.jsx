import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from '@/redux/features/auth/authApi';
// internal
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from '@/svg';

const ProfileInfo = () => {
  const dispatch = useDispatch();

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


  return (
    <div className="profile__info">
      <h3 className="profile__info-title">Personal Details</h3>
      <div className="profile__info-content">
        <div className="row">
          <div className="col-xxl-6 col-md-6">
            <div className="profile__input-box">
              <div className="profile__input">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your username"
                  value={userInfo?.user?.name || ""}
                  readOnly
                />
                <span>
                  <UserThree />
                </span>
              </div>
            </div>
          </div>

          <div className="col-xxl-6 col-md-6">
            <div className="profile__input-box">
              <div className="profile__input">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userInfo?.user?.email || ""}
                  readOnly
                />
                <span>
                  <EmailTwo />
                </span>
              </div>
            </div>
          </div>

          {/* <div className="col-xxl-12">
            <div className="profile__input-box">
              <div className="profile__input">
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter your number"
                  value={userInfo?.user?.phone || ""}
                  readOnly
                />
                <span>
                  <PhoneThree />
                </span>
              </div>
            </div>
          </div>

          <div className="col-xxl-12">
            <div className="profile__input-box">
              <div className="profile__input">
                <input
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={userInfo?.user?.address || ""}
                  readOnly
                />
                <span>
                  <LocationTwo />
                </span>
              </div>
            </div>
          </div>

          <div className="col-xxl-12">
            <div className="profile__input-box">
              <div className="profile__input">
                <textarea
                  name="bio"
                  placeholder="Enter your bio"
                  value={userInfo?.user?.bio || ""}
                  readOnly
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
