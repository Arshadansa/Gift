import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    cartTotal,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const [isHovered, setIsHovered] = useState(false); // State for hover

  const linkStyle = {
    display: "block",
    padding: "10px",
    margin:"auto",
    width:"35%",
    fontSize:"15px",
    border: isHovered ? "solid 1px black" : "solid 1px black",
    backgroundColor: isHovered ? "#990100" : "transparent", // Change color on hover
    color: isHovered ? "#fff" : "#000", // Change text color on hover
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease", // Smooth transition
  };
  return (
    <section className="tp-checkout-area pb-120" style={{ backgroundColor: "#EFF1F5" }}>
      <div className="container">
        {cart_products.length === 0 && (
          <div className="text-center pt-50">
            <h3 className="py-2">No items found in cart to checkout</h3>
            <Link 
             style={linkStyle} // Apply inline style
             onMouseEnter={() => setIsHovered(true)} // Set hover state
             onMouseLeave={() => setIsHovered(false)} // Reset hover state
            href="/shop" className="tp-btn tp-btn-border ">
              Return to shop
            </Link>
          </div>
        )}
        {cart_products.length > 0 && (
          <div className="row">
            <div className="col-xl-7 col-lg-7">
              <div className="tp-checkout-verify">
                <CheckoutLogin />
                <CheckoutCoupon
                  handleCouponCode={handleCouponCode}
                  couponRef={couponRef}
                  couponApplyMsg={couponApplyMsg}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="row">
                <div className="col-lg-7">
                  <CheckoutBillingArea register={register} errors={errors} />
                </div>
                <div className="col-lg-5">
                  <CheckoutOrderArea checkoutData={checkoutData} />
                </div>
              </div>
              
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutArea;
