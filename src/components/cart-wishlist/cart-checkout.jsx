import React from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";

const CartCheckout = () => {
  const {total} = useCartInfo();
  const [shipCost,setShipCost] = useState(0);
  // handle shipping cost 
  const handleShippingCost = (value) => {
    if(value === 'free'){
      setShipCost(0)
    }
    else {
      setShipCost(value)
    }
  }
  const [hover, setHover] = useState(false);

  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Subtotal</span>
        <span className="tp-cart-checkout-top-price">₹ {total}</span>
      </div>
     
      <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
        <span>Total</span>
        <span>₹{(total + shipCost).toFixed(2)}</span>
      </div>
      <div className="tp-cart-checkout-proceed">
        <Link 
        style={{
          backgroundColor: !hover ? "#990100" : "#000000", // Initial color #cc0000, hover color #990100
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          border: "none",
        }}
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)} 
        href="/checkout" className="tp-cart-checkout-btn w-100">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
