import React from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import about_img from "@assets/img/about/about-1.svg";
import about_thumb from "@assets/img/about/about-2.jpg";
import { ArrowRightLong } from "@/svg";
import ContactSocialMedia from "../SocialMedial/ContactSocialMedia";

const JewelryAbout = () => {
  return (
    <>
      <section className="tp-about-area pt-125 pb-180">
        <div className="container">
          <div className="row ">
            <div className="col-xl-5  col-lg-6">
              <div className="tp-about-thumb-wrapper p-relative mr-35">
                <div className="tp-about-thumb  m-img">
                  <Image
                    className="object-cover  h-[550px] md:h-[450px] sm:h-[350px] w-full" // Adjust height for different breakpoints
                    src={about_img}
                    alt="about_img"
                    layout="responsive" // Ensures the image maintains its aspect ratio
                    width={500} // Set the width you want to maintain
                    height={550} // Set the height you want to maintain
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="tp-about-wrapper pl-80 pt-75 pr-60">
                <div className="tp-section-title-wrapper-4 mb-50">
                  <span className="tp-section-title-pre-4">
                    Handcrafted with Love
                  </span>
                  <h3 className="tp-section-title-4 fz-50">
                    Discover Unique, Thoughtful Gifts for Every Occasion
                  </h3>
                </div>
                <div className="tp-about-content ">
                  <p>
                    At My Sweet Wishes Gift Shop, we believe in making every
                    moment special with our carefully curated collection of
                    gifts. From elegant jewelry pieces to custom keepsakes, each
                    item is crafted with love and attention to detail, ensuring
                    that your loved ones feel cherished. <br />
                    Whether you’re celebrating a birthday, anniversary, or
                    simply sharing a token of appreciation, our unique gifts are
                    perfect for every occasion.
                  </p>
                  <div className="tp-about-btn">
                    <Link href="/contactus" className="tp-btn">
                      Contact Us <ArrowRightLong />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-about-social mt-100">
          <div className="text-center">
            <h4 className="tp-about-social-title">Stay Connected with Us</h4>
            <div className="tp-about-social-media">
              <ContactSocialMedia />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryAbout;
