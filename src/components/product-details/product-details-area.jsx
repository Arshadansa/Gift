import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const ProductDetailsArea = ({ productItem }) => {
  const { data } = productItem; // Assuming productItem has a data property with product details
  const product = data[0]; // Get the first product object
  const { _id, images = [], videoId, stock_quantity, name } = product || {}; // Default to empty array if images is undefined

  const [activeImg, setActiveImg] = useState(images[0] || ''); // Set the first image as active or default to an empty string
  const dispatch = useDispatch();

  // Update active image when the images change
  useEffect(() => {
    if (images.length > 0) {
      setActiveImg(images[0]); // Initialize active image with the first image
    }
  }, [images]);

  // Handle active image change
  const handleImageActive = (item) => {
    setActiveImg(item.img || item); // Check if item has img property or is a URL directly
  };

  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top pb-115">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              {/* product-details-thumb-wrapper start */}
              <DetailsThumbWrapper
                images={images} // Pass the images array from your JSON data
                handleImageActive={handleImageActive} // Function to handle active image state
                activeImg={activeImg} // Currently active image
                imgWidth={416} // Default image width
                imgHeight={480} // Default image height
                videoId={videoId} // Optional video ID
                status={stock_quantity <= 0 ? 'out-of-stock' : 'in-stock'} // Determine stock status
              />
              {/* product-details-thumb-wrapper end */}
            </div>
            <div className="col-xl-5 col-lg-6">
              {/* product-details-wrapper start */}
              <DetailsWrapper
                productItem={product} // Pass the product object
                handleImageActive={handleImageActive} // Pass the handle function
                activeImg={activeImg} // Pass the currently active image
                detailsBottom={true} // Whether to show details at the bottom
              />
              {/* product-details-wrapper end */}
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav product={product} /> {/* Pass the product object */}
            </div>
          </div>
        </div>
      </div>
      {/* product details description */}

      {/* related products start */}
      <section className="tp-related-product pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center mb-40">
              <span className="tp-section-title-pre-6">Next day Products</span>
              <h3 className="tp-section-title-6">Related Products</h3>
            </div>
          </div>
          <div className="row">
            <RelatedProducts id={_id} /> {/* Pass the product ID to related products */}
          </div>
        </div>
      </section>
      {/* related products end */}
    </section>
  );
};

export default ProductDetailsArea;
