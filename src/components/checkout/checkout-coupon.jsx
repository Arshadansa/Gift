import { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutCoupon = ({ handleCouponCode, couponRef,couponApplyMsg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { coupon_info } = useSelector((state) => state.coupon);
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: !isHovered ? "#990100" : "#000000", // Change bg color on hover
    color: "#FFFFFF", // Text color remains white
    width: "30%", // Full width
    border: "none", // Remove border
    padding: "10px", // Padding for better spacing
    cursor: "pointer", // Change cursor to pointer on hover
    transition: "background-color 0.3s ease", // Smooth transition effect
   
  };
  return (
    <div className="tp-checkout-verify-item">
      <p className="tp-checkout-verify-reveal">
        Have a coupon?{" "}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="tp-checkout-coupon-form-reveal-btn"
        >
          Click here to enter your code
        </button>
      </p>

      {isOpen && (
        <div id="tpCheckoutCouponForm" className="tp-return-customer">
          <form onSubmit={handleCouponCode}>
            <div className="tp-return-customer-input">
              <label>Coupon Code :</label>
              <input ref={couponRef} type="text" placeholder="Coupon" />
            </div>
            <button
              type="submit"
              className=""
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
            >
              Apply
            </button>
          </form>
          {couponApplyMsg && <p className="p-2" style={{color:'green'}}>{couponApplyMsg}</p>}
        </div>
      )}
    </div>
  );
};

export default CheckoutCoupon;
