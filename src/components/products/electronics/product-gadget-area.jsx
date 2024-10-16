import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper";
import Link from "next/link";
// internal
import { ShapeLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import b_bg_1 from "@assets/img/product/gadget/gadget-banner-1.jpg";
import b_bg_2 from "@assets/img/product/gadget/gadget-banner-2.jpg";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import HomeGadgetPrdLoader from "@/components/loader/home/home-gadget-prd-loader";

const ProductGadgetArea = () => {
  const [activeTab, setActiveTab] = useState("featured");
  const [sortBy, setSortBy] = useState("default"); // State to track the sorting option
  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductTypeQuery(activeTab);

  let content = null;

  // Handle sorting logic based on the selected option
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortProducts = (products) => {
    if (sortBy === "low-to-high") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "high-to-low") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products; // Default sorting (no change)
  };

  if (isLoading) {
    content = <HomeGadgetPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products || products.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Sort the products before rendering
    const sortedProducts = sortProducts(products);

    content = sortedProducts.map((prd) => (
      <div key={prd.id} className="col-xl-3 col-lg-3 col-sm-6">
        <ProductItem product={prd} />
      </div>
    ));
  }

  function GadgetBanner() {
    const settings = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".tp-product-gadget-banner-slider-dot",
        clickable: true,
      },
    };

    const banner_data = [
      {
        bg: b_bg_1,
        title: (
          <>
            Selected novelty <br /> Products
          </>
        ),
        price: 99,
      },
      {
        bg: b_bg_2,
        title: (
          <>
            Top Rated <br /> Products
          </>
        ),
        price: 55,
      },
    ];

    return (
      <Swiper
        {...settings}
        effect="fade"
        modules={[Pagination, EffectFade]}
        className="tp-product-gadget-banner-slider-active swiper-container"
      >
        {banner_data.map((b, i) => (
          <SwiperSlide
            key={i}
            className="tp-product-gadget-banner-item include-bg"
            style={{ backgroundImage: `url(${b.bg.src})` }}
          >
            <div className="tp-product-gadget-banner-content">
              <span className="tp-product-gadget-banner-price">
                Only $ {b.price.toFixed(2)}
              </span>
              <h3 className="tp-product-gadget-banner-title">
                <Link href="/shop">{b.title}</Link>
              </h3>
            </div>
          </SwiperSlide>
        ))}
        <div className="tp-product-gadget-banner-slider-dot tp-swiper-dot"></div>
      </Swiper>
    );
  }

  return (
    <>
      <section className="tp-product-gadget-area BORDER pt-80 pb-75">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-xl-10 col-lg-9 col-md-8 ">
              <div className="tp-section-title-wrapper mb-40">
                <h3 className="tp-section-title text-20">
                  Featured Products
                  <ShapeLine />
                </h3>
              </div>
            </div>
            <div className="col-xl-2  text-md-end text-sm-start mb-3 mb-md-0 col-lg-2 col-md-2">
              {/* Sort by price dropdown */}
              <select
                style={{
                  width: "180px",
                  outline: "none", // Remove focus border outline
                  border: "1px solid #ccc", // Add a custom border (optional)
                  boxShadow: "none", // Remove any focus shadow
                }}
                onChange={handleSortChange}
                value={sortBy}
                className="form-select "
              >
                <option value="default">Sort by: Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="row">{content}</div>
        </div>
      </section>
    </>
  );
};

export default ProductGadgetArea;
