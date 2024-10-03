import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal imports
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ products, prdCenter = false, primary_style = false }) => {
  const { _id,product_id, images = [], name, sku, price, description, stock_quantity, status } = products || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd.product_id === product_id);
  const isAddedToWishlist = wishlist.some((prd) => prd.product_id === product_id);
  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: hovered ? "#990100" : "#000",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    display: "inline-block",
  };
  
  return (
    <div
      className={`tp-product-item-3 mb-50 ${primary_style ? "tp-product-style-primary" : ""} ${prdCenter ? "text-center" : ""}`}
    >
      <div style={{height:"300px"}} className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">

        <Link href={`/product-details/${product_id}`}>
          <Image src={images[0]} alt="product image" width={282} height={320} />
        </Link>

        <div className="tp-product-badge">
          {status === 'out-of-stock' && <span className="product-hot">Out of Stock</span>}
        </div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn text-center`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(products)}
                className={`tp-product-action-btn-3 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                disabled={status === 'out-of-stock'}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(products))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
          </div>
        </div>

        <div className="tp-product-add-cart-btn-large-wrapper">
          {!isAddedToCart ? (
            <Link
              href="/cart"
              style={buttonStyle}
              className="tp-product-add-cart-btn-large text-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              View To Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddProduct(products)}
              type="button"
              style={buttonStyle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="tp-product-add-cart-btn-large"
              disabled={status === 'out-of-stock'}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
      <div className="tp-product-content-3">
        <div className="tp-product-tag-3">
          <span>{sku}</span>
        </div>
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${product_id}`}>{name}</Link>
        </h3>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price-3">${Number(price).toFixed(2)}</span>
        </div>
        <div className="tp-product-stock-status">
          <span>In Stock: {stock_quantity}</span>
        </div>
        <div className="tp-product-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
