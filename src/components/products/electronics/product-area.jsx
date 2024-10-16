import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi"; // Ensure this hook is updated to fetch products based on category
import { ShapeLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

const tabs = ["Trending"];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [sortOption, setSortOption] = useState("none"); // Add sort option state
  const {
    data: products,
    isError,
    isLoading,
    refetch,
  } = useGetProductTypeQuery(activeTab); // Pass activeTab to the query

  useEffect(() => {
    refetch(); // Refetch when the active tab changes
  }, [activeTab, refetch]);

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Filter and sort products based on active tab and selected sort option
    const filteredProducts = products.filter((product) => {
      if (Array.isArray(product.categories)) {
        return product.categories;
      }
      return false;
    });

    // Sort filtered products based on price
    if (sortOption === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price); // Sort ascending
    } else if (sortOption === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price); // Sort descending
    }

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
    <section className="tp-product-area mt-40 pb-55">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-xl-4 col-lg-5 col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title text-20">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-8 text-md-end text-sm-start mb-3 mb-md-0 col-lg-7 col-md-7">
            <div className="sort-filter">
              <select
                style={{ 
                   width:"180px",
                  padding:"5px",
                  outline: "none", 
                  border: "1px solid #ccc", 
                  boxShadow: "none",
                  borderRadius:"5px"
                }}
                id="sort-by-price"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="none">Sort by :Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">{content}</div>
      </div>
    </section>
  );
};

export default ProductArea;
