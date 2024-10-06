import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper";
import Link from "next/link";
// internal
import { ArrowRight, ShapeLine } from "@/svg";
import ProductItem from "./product-item";
import PrdCategoryList from "./prd-category-list";
import ErrorMsg from "@/components/common/error-msg";
import b_bg_1 from "@assets/img/product/gadget/gadget-banner-1.jpg";
import b_bg_2 from "@assets/img/product/gadget/gadget-banner-2.jpg";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import gadget_girl from "@assets/img/product/gadget/gadget-girl.png";
import HomeGadgetPrdLoader from "@/components/loader/home/home-gadget-prd-loader";

const ProductGadgetArea = () => {
  const [activeTab, setActiveTab] = useState("featured");
  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductTypeQuery(activeTab);

  console.log("Products from API:", products); // Log the entire products object

  let content = null;

  if (isLoading) {
    content = <HomeGadgetPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products || products.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Loop through the products array directly
    content = products.map((prd) => (
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
          <div className="row">
            <div className="row align-items-start">
              <div className="col-xl-4 col-lg-5  col-md-5">
                <div className="tp-section-title-wrapper mb-40">
                  <h3 className="tp-section-title text-20">
                    Featured Products
                    <ShapeLine />
                  </h3>
                </div>
              </div>
            </div>
            <div className="row ">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGadgetArea;
