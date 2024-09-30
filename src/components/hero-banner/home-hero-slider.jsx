import React, { useState } from "react";
import { Navigation, Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useGetHeroSliderDataQuery } from "@/redux/api/apiSlice"; // Import the query hook
import { ArrowRightLong, SliderNextBtn, SliderPrevBtn, TextShape } from "@/svg";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import ErrorMsg from "../common/error-msg";

const HomeHeroSlider = () => {
  const [active, setActive] = useState(false);

  // Fetch data from the API
  const { data: sliderData, error, isLoading } = useGetHeroSliderDataQuery();

  const handleActiveIndex = (index) => {
    if (index === 2) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  let content = null;
  // if (isLoading){ content = <ErrorMsg msg="Loging" />};
  if (error){ content = <ErrorMsg msg="There was an error" />};

  return (
    <section className="tp-slider-area p-relative z-index-1">
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
            style={{ backgroundColor: item.bg_color || "#FFFFFF" }} // Updated for background color
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-6 col-md-6">
                  <div className="tp-slider-content p-relative z-index-1">
                    <h3 className="tp-slider-title">{item.heading}</h3>{" "}
                    {/* Updated to match "heading" */}
                    <p>{item.subheading}</p>{" "}
                    {/* Updated to match "subheading" */}
                    <div className="tp-slider-btn">
                      <div className="tp-slider-btn">
                        <Link href={item.button_link} legacyBehavior>
                          <a className="btn btn-danger">
                            {item.button_text} <ArrowRightLong />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6 col-md-6">
                  <div className="tp-slider-thumb text-end">
                    <Image
                      src={item.image}
                      alt="slider-img"
                      width={800} // You can adjust these values
                      height={525} // You can adjust these values
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
