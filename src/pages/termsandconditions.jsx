import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import Legal from "@/components/Legal";
import termsAndConditions from "@/data/termsandcondition"; 

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Terms and Conditions" />
      <HeaderTwo style_2={true} />
      <Legal terms={termsAndConditions} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default TermsAndConditions;
