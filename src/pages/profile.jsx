import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import ProfileArea from "@/components/my-account/profile-area";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/loader";

const ProfilePage = () => {
  const { accessToken } = useSelector((state) => state.auth); // Retrieve access token from Redux
  const router = useRouter(); // For navigation
  const { data: orders, error, isLoading } = useGetUserOrdersQuery(accessToken, {
    skip: !accessToken, // Skip query if accessToken is not available
  });

  console.log(accessToken,"orders",orders);
  
  // Handle any redirection if needed based on authentication or accessToken
  useEffect(() => {
    if (!accessToken) {
      router.push("/login"); // Redirect to login if no access token
    }
  }, [accessToken, router]);

  // Handle loading state
  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center">
        <h2>Error fetching orders: {error.message}</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Profile" />
      <HeaderTwo style_2={true} />
      <ProfileArea orderData={orders} /> {/* Pass orders to ProfileArea */}
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default ProfilePage;
