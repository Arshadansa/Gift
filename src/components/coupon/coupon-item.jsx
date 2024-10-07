import React from "react";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image"; // If you want to include a logo, ensure you provide a logo URL in your JSON
import OfferTimer from "./offer-timer"; // Ensure this is correctly implemented
import { InfoDetails } from "@/svg"; // Assuming you have an SVG icon for additional details

const CouponItem = ({ coupon, handleCopied, copiedCode, copied }) => {
  return (
    <div className="tp-coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
      <span className="tp-coupon-border"></span>
      <div className="tp-coupon-item-left d-sm-flex align-items-center">
        <div className="tp-coupon-thumb">
          {/* Assuming you want to display a logo, adjust this as needed */}
          {/* Replace `coupon.logo` with a valid image URL or remove this block if not needed */}
          <a href="#">
            <Image
              style={{ objectFit: "cover" }} // Correctly applying object-fit style
              src={
                coupon.logo ||
                "https://www.radiustheme.com/wp-content/uploads/edd/2023/04/Classified-Listing-Coupon-Addon-1024x576.png"
              } // Default image URL if no logo
              alt="logo"
              width={100}
              height={100}
            />
          </a>
        </div>
        <div className="tp-coupon-content">
          <h3 className="tp-coupon-title">Coupon Code: {coupon.code}</h3>
          <p className="tp-coupon-offer mb-15">
            <span>{coupon.discount}%</span> Off
          </p>
          <div className="tp-coupon-countdown">
            {dayjs().isAfter(dayjs(coupon.expiry_date)) ? (
              <div className="tp-coupon-countdown-inner">
                <ul>
                  <li>
                    <span>{0}</span> Day
                  </li>
                  <li>
                    <span>{0}</span> Hrs
                  </li>
                  <li>
                    <span>{0}</span> Min
                  </li>
                  <li>
                    <span>{0}</span> Sec
                  </li>
                </ul>
              </div>
            ) : (
              <OfferTimer expiryTimestamp={new Date(coupon.expiry_date)} />
            )}
          </div>
        </div>
      </div>
      <div className="tp-coupon-item-right pl-20">
        <div className="tp-coupon-status mb-10 d-flex align-items-center">
          <h4>
            Coupon{" "}
            <span
              className={
                dayjs().isAfter(dayjs(coupon.expiry_date))
                  ? "in-active"
                  : "active"
              }
            >
              {dayjs().isAfter(dayjs(coupon.expiry_date))
                ? "Inactive"
                : "Active"}
            </span>
          </h4>
          <div className="tp-coupon-info-details">
            <span>
              <InfoDetails />
            </span>
            <div className="tp-coupon-info-tooltip transition-3">
              <p>
                *This coupon code applies to{" "}
                <span>Gifts products</span> and will be valid when your purchase exceeds{" "}
                <span>₹{1000 || "0.00"}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="tp-coupon-date">
          <CopyToClipboard
            text={coupon.code}
            onCopy={() => handleCopied(coupon.code)}
          >
            <button>
              {copied && coupon.code === copiedCode ? (
                <span>Copied!</span>
              ) : (
                <span>{coupon.code}</span>
              )}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
