import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { QuickView } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";

const ShopListItem = ({ product }) => {
  const { product_id, name, price, stock_quantity, size, weight, description, images=[] } = product || {};
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);

  // Update the rating logic if necessary
  useEffect(() => {
    // Set a default rating if reviews are not present
    setRatingVal(0); // Change this logic if you have a way to define a default rating
  }, []);

  // Ensure price is a number
  const parsedPrice = Number(price).toFixed(2);

  // Handle add product to cart
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  
  

  return (
    <div className="tp-product-list-item d-md-flex">
      <div className="tp-product-list-thumb p-relative fix">
        <Link href={`/product-details/${product_id}`}>
          <Image
            src={images[0]} // Displaying the first image
            alt={name}
            width={350}
            height={310}
            placeholder="blur"
            blurDataURL="/placeholder-image.png" // Optional placeholder
          />
        </Link>

        {/* Product action buttons */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            <button
              type="button"
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
              onClick={() => dispatch(handleProductModal(product))}
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-list-content">
        <div className="tp-product-content-2 pt-15">
          <h3 className="tp-product-title-2">
            <Link href={`/product-details/${product_id}`}>{name}</Link>
          </h3>
          <div className="tp-product-rating-icon tp-product-rating-icon-2">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-price-wrapper-2">
            <span className="tp-product-price-2 new-price">${parsedPrice}</span>
          </div>
          <p>{description.substring(0, 100)}...</p>
          <div className="tp-product-list-add-to-cart">
            <button
              onClick={() => handleAddProduct(product)}
              className="tp-product-list-add-to-cart-btn"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopListItem;
