import React, { useState } from "react";
import { Navigation, Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useGetHeroSliderDataQuery } from "@/redux/api/apiSlice"; // Use the correct import for hero slider
import { ArrowRightLong, SliderNextBtn, SliderPrevBtn } from "@/svg";
import ErrorMsg from "../common/error-msg";
import Loader from "../loader/loader";
import Wrapper from "@/layout/wrapper";

const HomeHeroSlider = () => {
  const [active, setActive] = useState(false);

  // Fetch data for hero slider
  const { data: sliderData, error, isLoading } = useGetHeroSliderDataQuery();

  

  const handleActiveIndex = (index) => {
    setActive(index === 2);
  };

  let content = null;
  if (isLoading) {
    content = (
      <Wrapper>
        <Loader msg="Loading..." />;
      </Wrapper>
    );
  } else if (error) {
    content = (
      <Wrapper>
        <ErrorMsg msg="There was an error" />;
      </Wrapper>
    );
  }

  return (
    <section>
      {content}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        effect="fade"
        navigation={{
          nextEl: ".tp-slider-button-next",
          prevEl: ".tp-slider-button-prev",
        }}
        onSlideChange={(swiper) => handleActiveIndex(swiper.activeIndex)}
        pagination={{ el: ".tp-slider-dot", clickable: true }}
        modules={[Navigation, Pagination, EffectFade]}
        className={`tp-slider-active tp-slider-variation swiper-container ${
          active ? "is-light" : ""
        }`}
      >
        {sliderData?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="tp-slider-item tp-slider-height d-flex align-items-center"
            style={{ backgroundColor: item.bg_color || "transparent" }}
          >
            <div
              className="container"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-6 col-md-6">
                  <div className="tp-slider-content p-relative z-index-1">
                    <h3 className="tp-slider-title">{item.heading}</h3>
                    <p>{item.subheading}</p>
                    <div className="tp-slider-btn">
                      <Link
                        href={
                          // Assuming that category IDs are purely numeric
                          /^[0-9]+$/.test(item.button_link) // Check if button_link is a numeric string
                            ? `shop?category=${item.button_link}`
                            : `product-details/${item.button_link}`
                        }
                        legacyBehavior
                      >
                        <a className="btn btn-danger">
                          {item.button_text} <ArrowRightLong />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6 col-md-6">
                  <div className="tp-slider-thumb text-end">
                    <Image
                      src={item.image}
                      alt="slider-img"
                      width={800}
                      height={525}
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="tp-slider-arrow tp-swiper-arrow">
          <button type="button" className="tp-slider-button-prev">
            <SliderPrevBtn />
          </button>
          <button type="button" className="tp-slider-button-next">
            <SliderNextBtn />
          </button>
        </div>
        <div className="tp-slider-dot tp-swiper-dot"></div>
      </Swiper>
    </section>
  );
};

export default HomeHeroSlider;
