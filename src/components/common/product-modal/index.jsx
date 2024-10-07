import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
// internal
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsThumbWrapper from "@/components/product-details/details-thumb-wrapper";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "calc(100% - 300px)",
  },
};

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector((state) => state.productModal);
  const { images = [], status } = productItem || {}; // Ensure images is an array
  const [activeImg, setActiveImg] = useState(images[0]); // Set the first image as default
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (images.length > 0) {
      setActiveImg(images[0]); // Set first image as active if available
    }
    setLoading(false);
    dispatch(initialOrderQuantity());
  }, [images, dispatch]);

  const handleImageActive = (item) => {
    setActiveImg(item); // Set selected image as active
    setLoading(true);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => dispatch(handleModalClose())}
      style={customStyles}
      contentLabel="Product Modal"
    >
      <div className="tp-product-modal">
        <div className="tp-product-modal-content d-lg-flex">
          <button
            onClick={() => dispatch(handleModalClose())}
            type="button"
            className="tp-product-modal-close-btn"
          >
            <i className="fa-regular fa-xmark"></i>
          </button>

          {/* product-details-thumb-wrapper start */}
          <DetailsThumbWrapper
            activeImg={activeImg} // Use active image
            handleImageActive={handleImageActive}
            imageURLs={images} // Pass all images
            imgWidth={416}
            imgHeight={480}
            loading={loading}
            status={status}
          />
          {/* product-details-thumb-wrapper end */}

          {/* product-details-wrapper start */}
          <DetailsWrapper
            productItem={productItem}
            handleImageActive={handleImageActive}
            activeImg={activeImg} // Ensure active image is passed
          />
          {/* product-details-wrapper end */}
        </div>
      </div>
    </ReactModal>
  );
};

export default ProductModal;

