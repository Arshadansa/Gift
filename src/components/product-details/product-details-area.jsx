import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const ProductDetailsArea = ({ productItem }) => {
  const {
    images = [],
    videoId = null,
    stock_quantity = 0,
    name = "Product Name",
    description = "",
    price = "0.00",
    categories = [],
    sku = "",
    product_id,
  } = productItem || {};

  const [activeImg, setActiveImg] = useState(images[0] || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (images.length > 0) {
      setActiveImg(images[0]);
    }
  }, [images]);

  const handleImageActive = (img) => {
    setActiveImg(img);
  };

  // Access the first category's ID as a string
  const cat_id = categories.length > 0 ? categories[0] : null;

  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top pb-115">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                images={images}
                handleImageActive={handleImageActive}
                activeImg={activeImg}
                imgWidth={416}
                imgHeight={480}
                videoId={videoId}
                status={stock_quantity > 0 ? "in-stock" : "out-of-stock"}
              />
            </div>

            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productItem={productItem}
                handleImageActive={handleImageActive}
                activeImg={activeImg}
                detailsBottom={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="tp-related-product pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center mb-40">
              <span
                style={{ color: "#990100" }}
                className="tp-section-title-pre-6"
              >
                Next day Products
              </span>
              <h3 className="tp-section-title-6">Related Products</h3>
            </div>
          </div>
          <div className="row">
            {cat_id ? (
              <RelatedProducts id={Number(cat_id)} /> // Ensure id is a string
            ) : (
              <p>No related products available.</p> // Fallback message if no related product
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsArea;
