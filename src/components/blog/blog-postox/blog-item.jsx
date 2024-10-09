import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
// Internal component for video popup
import PopupVideo from "@/components/common/popup-video";

// Slider settings
const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: ".tp-postbox-slider-button-next",
    prevEl: ".tp-postbox-slider-button-prev",
  },
};

const BlogItem = ({ item = {} }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Function to render the blog thumbnail based on item type
  const renderThumbnail = () => {
    if (item.blockquote || item.video || item.audio || item.slider) {
      return null; // Don't show image if it's a blockquote, video, audio, or slider
    }
    return (
      <div
        className="tp-postbox-thumb w-img"
        style={{ height: "350px", overflow: "hidden" }}
      >
        <Link href={`/blog-details/${item.id}`}>
          <Image
            src={item.image_url}
            width={10}
            height={10}
            alt="blog img"
            layout="responsive"
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
    );
  };

  // Function to render video thumbnail
  const renderVideoThumbnail = () => (
    <div className="tp-postbox-thumb tp-postbox-video w-img p-relative">
      <Link href={`/blog-details/${item.id}`}>
        <Image
          src={item.image_url}
          width={10}
          height={10}
          alt="blog img"
          layout="responsive"
        />
      </Link>
      <a
        onClick={() => setIsVideoOpen(true)}
        className="cursor-pointer tp-postbox-video-btn popup-video"
      >
        <i className="fas fa-play"></i>
      </a>
    </div>
  );

  // Function to render audio content
  const renderAudioContent = () => (
    <div className="tp-postbox-thumb tp-postbox-audio w-img p-relative">
      <iframe allow="autoplay" src={item.audio_id}></iframe>
    </div>
  );

  // Function to render slider content
  const renderSliderContent = () => (
    <Swiper
      {...sliderSettings}
      modules={[Navigation, Autoplay]}
      className="tp-postbox-thumb tp-postbox-slider swiper-container w-img p-relative"
    >
      {item.slider_images.map((img, i) => (
        <SwiperSlide key={i} className="tp-postbox-slider-item">
          <Image
            src={img.image_url}
            width={10}
            height={10}
            alt="slider img"
            layout="responsive"
          />
        </SwiperSlide>
      ))}
      <div className="tp-postbox-nav">
        <button className="tp-postbox-slider-button-next">
          <i className="fal fa-arrow-right"></i>
        </button>
        <button className="tp-postbox-slider-button-prev">
          <i className="fal fa-arrow-left"></i>
        </button>
      </div>
    </Swiper>
  );

  return (
    <>
      <article className="tp-postbox-item format-image mb-50 transition-3">
        {renderThumbnail()}
        {item.video && renderVideoThumbnail()}
        {item.audio && renderAudioContent()}
        {item.slider && renderSliderContent()}

        {!item.blockquote && (
          <div className="tp-postbox-content">
            <div className="tp-postbox-meta">
              <span>
                <i className="far fa-calendar-check"></i> {item.created_at}
              </span>
              <span>
                <a href="#">
                  <i className="far fa-user"></i> {item.author}
                </a>
              </span>
            </div>
            <h3 className="tp-postbox-title">
              <Link
                href={`/blog-details/${item.id}`}
                style={{ color: "#000000", transition: "color 0.3s ease" }} // Initial color black with smooth transition
                onMouseEnter={(e) => {
                  e.target.style.color = "#990100"; // Change color to #990100 on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#000000"; // Revert back to initial color
                }}
              >
                {item.title}
              </Link>
            </h3>

            {/* <div
              className="tp-postbox-text"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div> */}

            <div className="tp-postbox-read-more">
              <Link href={`/blog-details/${item.id}`} className="tp-btn">
                Read More
              </Link>
            </div>
          </div>
        )}

        {item.blockquote && (
          <div className="tp-postbox-quote">
            <blockquote>
              <p>
                {item.title}
                <cite>{item.author}</cite>
              </p>
            </blockquote>
          </div>
        )}
      </article>

      {/* Modal popup for video */}
      {item.video && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={item.video_id}
        />
      )}
    </>
  );
};

export default BlogItem;
