import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ForgotArea from "@/components/login-register/forgot-area";
import Footer from "@/layout/footers/footer";
import VerifyArea from "@/components/forms/verifyForm";

const Verify = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Verify Password"
        subtitle="Verify Password"
        center={true}
      />
      <VerifyArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default Verify;
