import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

const tabs = ["HAPPYCARDS", "RETURNGIFT", "CUDDLYCLASS", "SUPERNATURALCLASS"];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("HAPPYCARDS");
  const { data: products, isError, isLoading, refetch } = useGetProductTypeQuery();

  // Log product data
  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    refetch();
  }, [activeTab, refetch]);

  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Filter products based on the active tab
    const filteredProducts = products.filter(product => product.name === activeTab);

    if (filteredProducts.length === 0) {
      content = <ErrorMsg msg="No Products found in this category!" />;
    } else {
      content = filteredProducts.map((prd, i) => (
        <div key={prd.id} className="col-xl-3 col-lg-3 col-sm-6">
          <ProductItem product={prd} />
        </div>
      ));
    }
  }

  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-7">
            <div className="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
              <ul className="nav nav-tabs justify-content-sm-end">
                {tabs.map((tab, i) => (
                  <li key={i} className="nav-item">
                    <button
                      onClick={() => handleActiveTab(tab)}
                      className={`nav-link text-capitalize ${activeTab === tab ? "active" : ""}`}
                    >
                      {tab.split("-").join(" ")}
                      <span className="tp-product-tab-line">
                        <TabLine />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ProductArea;
