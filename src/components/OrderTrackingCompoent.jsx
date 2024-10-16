import { useTrackOrderQuery } from "@/redux/features/order/orderApi";
import React from "react";
import Loader from "./loader/loader";
import ErrorMsg from "./common/error-msg";

const OrderTrackingComponent = ({ orderId, accessToken }) => {
  // Fetch order tracking details using the custom hook
  const { data, error, isLoading } = useTrackOrderQuery({
    orderId,
    accessToken,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div>
        <ErrorMsg />
      </div>
    );
  }

  // Check if there's tracking data
  if (!data || data.status !== "success" || !data.tracking_info) {
    return <div>No tracking information available.</div>;
  }

  // Get the tracking details
  const trackingInfo = data.tracking_info.tracking_data; // Directly access the tracking_data object

  // Check if trackingInfo is valid before proceeding
  if (!trackingInfo) {
    return <div>No tracking information found.</div>;
  }

  // Destructure tracking data for easier access
  const { shipment_track_activities } = trackingInfo;

  // Define inline styles
  const timelineStyle = {
    position: "relative",
    margin: "20px 0",
    padding: 0,
    listStyle: "none",
  };

  const timelineItemStyle = {
    padding: "10px 20px",
    borderLeft: "2px solid #990100",
    marginLeft: "20px",
    position: "relative",
  };

  const timelineDotStyle = {
    content: '""',
    width: "12px",
    height: "12px",
    backgroundColor: "#990100",
    borderRadius: "50%",
    position: "absolute",
    left: "-7px",
    top: "10px",
  };

  const dateStyle = {
    fontWeight: "bold",
    color: "#555",
  };

  const statusStyle = {
    fontSize: "1.1em",
    marginTop: "5px",
    color: "#333",
  };

  const locationStyle = {
    color: "#777",
    marginTop: "5px",
  };

  return (
    <div>
      <h2 style={{ fontSize: "20px" }}>
        Order Tracking Timeline for Order ID: {orderId}
      </h2>

      {/* Display specific error messages if present */}
      {trackingInfo.shipment_track_activities && trackingInfo.shipment_track_activities.length > 0 ? (
        <div style={timelineStyle}>
          {trackingInfo.shipment_track_activities.map((activity, index) => (
            <div key={index} style={timelineItemStyle}>
              <div style={timelineDotStyle}></div>
              <div style={dateStyle}>
                {new Date(activity.date).toLocaleString()}
              </div>
              <div style={statusStyle}>{activity.activity || "N/A"}</div>
              <div style={locationStyle}>{activity.location || "N/A"}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No shipment tracking data available.</div>
      )}
    </div>
  );
};

export default OrderTrackingComponent;
