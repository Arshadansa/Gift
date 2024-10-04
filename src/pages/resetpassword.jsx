import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ForgotArea from "@/components/login-register/forgot-area";
import Footer from "@/layout/footers/footer";
import ResetArea from "@/components/forms/resetForm";

const Reset = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="New Password"
        subtitle="New Password"
        center={true}
      />
      <ResetArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default Reset;
