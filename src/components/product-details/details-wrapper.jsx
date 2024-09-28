import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from '@/svg';
import DetailsBottomInfo from './details-bottom-info';
import ProductDetailsCountdown from './product-details-countdown';
import ProductQuantity from './product-quantity';
import { add_cart_product } from '@/redux/features/cartSlice';
import { add_to_wishlist } from '@/redux/features/wishlist-slice';
import { add_to_compare } from '@/redux/features/compareSlice';
import { handleModalClose } from '@/redux/features/productModalSlice';

const DetailsWrapper = ({ productItem, handleImageActive, activeImg, detailsBottom = false }) => {
  const { sku, images, name, description, price, stock_quantity, categories = [] } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch();

  // Assuming you might fetch reviews separately if applicable
  const reviews = []; // Replace with actual reviews if available

  useEffect(() => {
    if (reviews.length > 0) {
      const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // Handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // Handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // Handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{categories.length > 0 ? `Category ID: ${categories[0]}` : 'Unknown Category'}</span>
      </div>
      <h3 className="tp-product-details-title">{name}</h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-details-reviews">
            <span>({reviews.length > 0 ? reviews.length : 0} Review)</span>
          </div>
        </div>
      </div>
      <p>
        {textMore ? description : `${description.substring(0, 100)}...`}
        <span onClick={() => setTextMore(!textMore)}>{textMore ? 'See less' : 'See more'}</span>
      </p>

      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        <span className="tp-product-details-price new-price">${parseFloat(price).toFixed(2)}</span>
      </div>

      {/* image display */}
      <div className="tp-product-details-image-gallery">
        {images.map((image, index) => (
          <img src={image} alt={`Product Image ${index + 1}`} key={index} />
        ))}
      </div>

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Quantity</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {/* product quantity */}
          <ProductQuantity />
          {/* product quantity */}
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button onClick={() => handleAddProduct(productItem)} disabled={stock_quantity <= 0} className="tp-product-details-add-to-cart-btn w-100">Add To Cart</button>
          </div>
        </div>
        <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">Buy Now</button>
        </Link>
      </div>

      {/* product-details-action-sm start */}
     
      {/* product-details-action-sm end */}

      {detailsBottom && <DetailsBottomInfo category={categories.length > 0 ? categories[0] : 'Unknown Category'} sku={sku} tag={''} />} 
    </div>
  );
};

export default DetailsWrapper;
