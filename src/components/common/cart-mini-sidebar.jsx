import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import RenderCartProgress from "./render-cart-progress";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import { closeCartMini, remove_product } from "@/redux/features/cartSlice";

const CartMiniSidebar = () => {
  const { cart_products, cartMiniOpen } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  // Handle remove product
  const handleRemovePrd = (productId, productName) => {
    dispatch(remove_product({ product_id: productId, name: productName })); // Pass both product_id and name
  };
  // Handle close cart mini
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };
  const [isHovered, setIsHovered] = useState(false); // State for hover
  const [isHoveredSec, setIsHoveredSec] = useState(false); // State for hover

  const linkStyle = {
    display: "block",
    padding: "10px",
    border: isHovered ? "solid 1px black" : "solid 1px black",
    backgroundColor: isHovered ? "#990100" : "transparent", // Change color on hover
    color: isHovered ? "#fff" : "#000", // Change text color on hover
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease", // Smooth transition
  };
  const linkStyleSec = {
    display: "block",
    padding: "10px",
    border:isHoveredSec ? "solid 1px black" : "solid 1px black",
    backgroundColor: isHoveredSec ? "#990100" : "Black", // Change color on hover
    color: isHoveredSec ? "#fff" : "#fff", // Change text color on hover
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease", // Smooth transition
  };
  return (
    <>
      <div
        className={`cartmini__area tp-all-font-roboto ${
          cartMiniOpen ? "cartmini-opened" : ""
        }`}
      >
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div className="cartmini__top p-relative">
              <div className="cartmini__top-title">
                <h4>Shopping cart</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={handleCloseCartMini}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            <div className="cartmini__shipping">
              <RenderCartProgress />
            </div>
            {cart_products.length > 0 ? (
              <div className="cartmini__widget">
                {cart_products.map((item) => (
                  <div key={item.product_id} className="cartmini__widget-item">
                    <div className="cartmini__thumb">
                      <Link href={`/product-details/${item.product_id}`}>
                        <Image
                          src={item.images[0]}
                          width={70}
                          height={60}
                          alt="product img"
                        />
                      </Link>
                    </div>
                    <div className="cartmini__content">
                      <h5 className="cartmini__title">
                        <Link href={`/product-details/${item.product_id}`}>
                          {item.name}
                        </Link>
                      </h5>
                      <div className="cartmini__price-wrapper">
                        {item.discount > 0 ? (
                          <span style={{color:"#990100"}} className="cartmini__price">
                            $
                            {(
                              Number(item.price) -
                              (Number(item.price) * Number(item.discount)) / 100
                            ).toFixed(2)}
                          </span>
                        ) : (
                          <span style={{color:"#990100"}} className="cartmini__price">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        )}
                        <span className="cartmini__quantity">
                          {" "}
                          x{item.orderQuantity}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleRemovePrd(item.product_id, item.name)
                      }
                      className="cartmini__del cursor-pointer"
                      type="button" // Ensure the button type is specified
                    >
                      <i className="fa-regular fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cartmini__empty text-center">
                <Image src={empty_cart_img} alt="empty-cart-img" />
                <p>Your Cart is empty</p>
                <Link href="/shop" className="tp-btn">
                  Go to Shop
                </Link>
              </div>
            )}
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-30">
              <h4>Subtotal:</h4>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cartmini__checkout-btn">
              <Link
                href="/cart"
                onClick={handleCloseCartMini}
                className="tp-btn mb-10 w-100"
                style={linkStyle} // Apply inline style
                onMouseEnter={() => setIsHovered(true)} // Set hover state
                onMouseLeave={() => setIsHovered(false)} // Reset hover state
              >
                view cart
              </Link>
              <Link
               style={linkStyleSec} // Apply inline style
               onMouseEnter={() => setIsHoveredSec(true)} // Set hover state
               onMouseLeave={() => setIsHoveredSec(false)} // Reset hover state
                href="/checkout"
                onClick={handleCloseCartMini}
                className="tp-btn tp-btn-border w-100"
              >
                checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* overlay start */}
      <div
        onClick={handleCloseCartMini}
        className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default CartMiniSidebar;
