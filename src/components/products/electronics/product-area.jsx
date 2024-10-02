import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi"; // Ensure this hook is updated to fetch products based on category
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

 const tabs = ["Trending",];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const { data: products, isError, isLoading, refetch } = useGetProductTypeQuery(activeTab); // Pass activeTab to the query

  // Log product data
  useEffect(() => {

  }, [products]);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    refetch(); // Refetch when the active tab changes
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
    const filteredProducts = products.filter(product => {
      // Check if categories is defined and is an array
      if (Array.isArray(product.categories)) {
        // Assuming `tabs` have matching values with categories
        return product.categories;
      }
      return false; // Exclude products without categories
    });
    

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
        <div className="row align-items-start">
          <div className="col-xl-4 col-lg-5  col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title text-20">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
     
        </div>
        <div className="row ">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ProductArea;
