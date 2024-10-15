import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({ checkoutData, setShowCard, showCard }) => {
  const {
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    register,
    errors,
    discountAmount,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const buttonStyle = {
    backgroundColor: !isHovered ? "#990100" : "#000000",
    color: "#FFFFFF",
    width: "100%",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    opacity: isLoading || isCheckoutSubmit ? "0.5" : "1", // Add loading condition
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true); // Start loading
    try {
      await checkoutData.submitHandler(); // Assuming submitHandler is passed down
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      setIsLoading(false); // Stop loading after the operation
    }
  };

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        {/* Order Info List */}
        <ul>
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.name} <span> x {item.orderQuantity}</span>
              </p>
              <span style={{ color: "#990100" }}>
              ₹{Number(item.price).toFixed(2)}
              </span>
            </li>
          ))}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span style={{ color: "#990100" }}>
            ₹{parseFloat(total).toFixed(2)}
            </span>
          </li>
          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span style={{ color: "#990100" }}>
            ₹{discountAmount.toFixed(2)}
            </span>
          </li>
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span style={{ color: "#990100" }}>
            ₹{parseFloat(cartTotal).toFixed(2)}
            </span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, { required: `Payment Option is required!` })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="online"
          />
          <label  htmlFor="back_transfer">
            Online Payment
          </label>
         
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, { required: `Payment Option is required!` })}
    
            type="radio"
            id="cod"
            name="payment"
            value="cod"
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          className="w-100"
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handlePlaceOrder}
          disabled={isLoading || isCheckoutSubmit}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
