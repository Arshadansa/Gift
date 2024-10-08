import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutCoupon = ({ handleCouponCode, couponRef, couponApplyMsg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [displayMsg, setDisplayMsg] = useState(couponApplyMsg);

  const buttonStyle = {
    backgroundColor: isHovered ? "#000000" : "#990100",
    color: "#FFFFFF",
    width: "30%",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  useEffect(() => {
    // Update displayMsg whenever couponApplyMsg changes
    setDisplayMsg(couponApplyMsg);

    // If there is a message, set a timeout to clear it after 10 seconds
    if (couponApplyMsg) {
      const timer = setTimeout(() => {
        setDisplayMsg(""); // Clear the message after 10 seconds
        setIsOpen(false);
      }, 10000);

      // Clear the timeout if the component unmounts or couponApplyMsg changes
      return () => clearTimeout(timer);
    }
  }, [couponApplyMsg]);

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
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Apply
            </button>
          </form>
          {displayMsg && <p className="p-2" style={{ color: 'green' }}>{displayMsg}</p>}
        </div>
      )}
    </div>
  );
};

export default CheckoutCoupon;
