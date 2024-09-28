import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Cart, QuickView } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, offer_style = false }) => {
  const { id, name, image, category, reviews, price, discount, status, offerDate } = product || {};
  const dispatch = useDispatch();
  
  // Redux state for cart and wishlist
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  
  const isAddedToCart = cart_products.some((prd) => prd.id === id);
  const isAddedToWishlist = wishlist.some((prd) => prd.id === id);
  
  // State for rating
  const [ratingVal, setRatingVal] = useState(0);
  
  // Calculate average rating from reviews
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // Handle adding product to cart
  const handleAddProduct = () => {
    const productToAdd = {
      id,
      name,
      image,
      price,
      discount, // Include discount if needed
    };
    dispatch(add_cart_product(productToAdd));
  };

  // Handle adding product to wishlist
  const handleWishlistProduct = () => {
    dispatch(add_to_wishlist(product));
  };

  return (
    <div className={`${offer_style ? "tp-product-offer-item" : "mb-25"} tp-product-item transition-3`}>
      <div className="tp-product-thumb p-relative fix">
        <Link href={`/product-details/${id}`}>
          <Image
            src={image}
            width={300} // Adjust width based on your layout
            height={300} // Adjust height based on your layout
            alt={name} // Use product name for alt text
            className="w-full h-auto"
          />
        </Link>

        {/* Product badge for out-of-stock status */}
        <div className="tp-product-badge">
          {status === 'out-of-stock' && <span className="product-hot">Out of Stock</span>}
        </div>

        {/* Product action buttons */}
        <div className="tp-product-action">
          <div className="tp-product-action-item d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
              >
                <Cart /> <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                onClick={handleAddProduct}
                type="button"
                className={`tp-product-action-btn ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                disabled={status === 'out-of-stock'}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              type="button"
              className="tp-product-action-btn tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
            <button
              onClick={handleWishlistProduct}
              type="button"
              className={`tp-product-action-btn tp-product-wishlist-btn ${isAddedToWishlist ? 'active' : ''}`}
            >
              <span className="tp-product-tooltip">{isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product content */}
      <div className="tp-product-content">
        <div className="tp-product-category">
          <Link href={`/category/${category?.id}`}>{category?.name}</Link> {/* Link to category page */}
        </div>
        <h3 className="tp-product-title">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>
        <div className="tp-product-rating d-flex align-items-center">
          <div className="tp-product-rating-icon">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-rating-text">
            <span>({reviews?.length || 0} Reviews)</span>
          </div>
        </div>
        <div className="tp-product-price-wrapper">
          {discount > 0 ? (
            <>
              <span className="tp-product-price old-price">{price}</span>
              <span className="tp-product-price new-price">
                ${(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="tp-product-price new-price">price:{parseFloat(price).toFixed(2)}</span>
          )}
        </div>

        {/* Countdown timer for offers */}
        {offer_style && (
          <div className="tp-product-countdown">
            <div className="tp-product-countdown-inner">
              {dayjs().isAfter(offerDate?.endDate) ? (
                <ul>
                  <li><span>{0}</span> Days</li>
                  <li><span>{0}</span> Hrs</li>
                  <li><span>{0}</span> Min</li>
                  <li><span>{0}</span> Sec</li>
                </ul>
              ) : (
                <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
