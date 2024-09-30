import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const ProductDetailsArea = ({ productItem }) => {
  // Destructuring productItem directly and providing default values if fields are missing
  const {
    id,
    images = [],
    videoId = null,
    stock_quantity = 0,
    name = "Product Name",
    description = "",
    price = "0.00",
    categories = [],
    sku = "",
  } = productItem || {}; 

  // Set the initial active image
  const [activeImg, setActiveImg] = useState(images[0] || '');

  const dispatch = useDispatch(); // Redux actions if needed

  // Update the active image when images change
  useEffect(() => {
    if (images.length > 0) {
      setActiveImg(images[0]); // Default to the first image
    }
  }, [images]);

  // Handle active image selection
  const handleImageActive = (img) => {
    setActiveImg(img); // Set the clicked image as active
  };

  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top pb-115">
        <div className="container">
          <div className="row">
            {/* Image Gallery and Thumbnails */}
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                images={images} // Pass product images
                handleImageActive={handleImageActive} // Update active image
                activeImg={activeImg} // Currently active image
                imgWidth={416} // Set image width
                imgHeight={480} // Set image height
                videoId={videoId} // Video ID if applicable
                status={stock_quantity > 0 ? 'in-stock' : 'out-of-stock'} // Stock status
              />
            </div>

            {/* Product Details */}
            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productItem={productItem} // Pass the full product object
                handleImageActive={handleImageActive} // Handle image selection
                activeImg={activeImg} // Active image in gallery
                detailsBottom={true} // Enable additional details at the bottom
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Description & Tabs */}
      <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav product={productItem} /> {/* Pass the full product to tabs */}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="tp-related-product pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center mb-40">
              <span className="tp-section-title-pre-6">Next day Products</span>
              <h3 className="tp-section-title-6">Related Products</h3>
            </div>
          </div>
          <div className="row">
            <RelatedProducts id={id} /> {/* Use the current product's ID */}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsArea;
