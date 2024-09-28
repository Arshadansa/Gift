import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import Legal from "@/components/Legal";
import privacypolicy from "@/data/privacypolicy"; 

const PrivacyPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Privacy Policy" />
      <HeaderTwo style_2={true} />
      <Legal terms={privacypolicy} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default PrivacyPage;
