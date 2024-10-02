import React, { useState } from "react";
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
  const [mounted, setMounted] = useState(false); // Track when the component has mounted
  const { accessToken } = useSelector((state) => state.auth); 
  const router = useRouter();
  const { data: orders, error, isLoading } = useGetUserOrdersQuery(accessToken, {
    skip: !accessToken,
  });

  // Use useEffect to set mounted to true when the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!accessToken && mounted) {
      router.push("/login");
    }
  }, [accessToken, router, mounted]);

  // Prevent rendering until the component is mounted to avoid SSR issues
  if (!mounted) {
    return null; // This avoids any discrepancies during server-side rendering
  }

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Loader loading={isLoading} />
      </div>
    );
  }

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
      <ProfileArea orderData={orders} />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default ProfilePage;






