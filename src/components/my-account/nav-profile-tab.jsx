import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Box, DeliveryTwo, Processing, Truck } from "@/svg"; // SVGs used for icons
import { userLoggedOut, userLoggedIn } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/auth/authApi";

const NavProfileTab = ({ orderData }) => {
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

  // Handle Logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push('/');
  };

  // Calculate total orders, pending orders, and placeholders for processing/delivered
  const totalOrders = orderData?.length || 0;
  const pendingOrders = orderData?.data?.filter(order => order.data.status === "pending").length || 0;
  const processingOrders = orderData?.data?.filter(order => order.data.status === "processing").length || 0;
  const deliveredOrders = orderData?.data?.filter(order => order.data.status === "delivered").length || 0;

  return (
    <div className="profile__main">
      <div className="profile__main-top pb-80">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              <div className="profile__main-content">
                <h4 className="profile__main-title">Welcome Mr. {userInfo?.user?.name}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile__main-logout text-sm-end">
              <a onClick={handleLogout} className="cursor-pointer tp-logout-btn">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__main-info">
        <div className="row gx-3">
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-download">{totalOrders}</span>
                  <Box />
                </span>
              </div>
              <h4 className="profile__main-info-title">Total Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-order">{pendingOrders}</span>
                  <Processing />
                </span>
              </div>
              <h4 className="profile__main-info-title">Pending Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">{processingOrders}</span>
                  <Truck />
                </span>
              </div>
              <h4 className="profile__main-info-title">Processing Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">{deliveredOrders}</span>
                  <DeliveryTwo />
                </span>
              </div>
              <h4 className="profile__main-info-title">Complete Order</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfileTab;
