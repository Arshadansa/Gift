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
        {/* Thumbnails */}
        <nav style={{ maxHeight: "800px", overflowY: "auto",marginRight:"8px" }}>
          <div className="nav nav-tabs flex-sm-column">
            {images?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item === activeImg ? "active" : ""}`} // Highlight the active thumbnail
                onClick={() => handleImageActive(item)} // Set the clicked image as the active image
              >
                <Image
                  src={item || "/default-image.png"} // Use the item for thumbnails
                  alt={`Product thumbnail ${i + 1}`}
                  width={imgWidth}
                  height={imgHeight}
                  layout="responsive"
                />
              </button>
            ))}
          </div>
        </nav>

        {/* Main Image */}
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
            <Image
                src={activeImg || "/default-image.png"}
                alt="Product image"
                width={imgWidth}
                height={imgHeight}
                layout="responsive"
                style={{ borderRadius: "8px" }} // Optional: add rounded corners
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

      {/* Video Popup */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
    </>
  );
};

export default DetailsThumbWrapper;
