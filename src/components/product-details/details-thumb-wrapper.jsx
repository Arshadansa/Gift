import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";

const DetailsThumbWrapper = ({
  images,
  handleImageActive,
  activeImg,
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav>
          <div className="nav nav-tabs flex-sm-column">
            {images?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item.img === activeImg ? "active" : ""}`}
                onClick={() => {
                  console.log("Image clicked:", item.img); // Check clicked image
                  handleImageActive(item);
                }}
              >
                <Image
                  src={activeImg || "/default-image.png"} // Use the correct path to the default image
                  alt="Product image"
                  width={imgWidth}
                  height={imgHeight}
                  layout="responsive"
                />
              </button>
            ))}
          </div>
        </nav>
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {/* Check if activeImg is valid before rendering */}
              <Image
                src={activeImg || "/default-image.png"} // Fallback to a default image
                alt="Product image"
                width={imgWidth}
                height={imgHeight}
                layout="responsive"
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">Out of Stock</span>
                )}
              </div>
              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)} // Open video on click
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal popup start */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
      {/* modal popup end */}
    </>
  );
};

export default DetailsThumbWrapper;
