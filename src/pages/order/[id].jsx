import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import logo from "@assets/img/logo/logo.png";
import ErrorMsg from "@/components/common/error-msg";
import { useGetUserOrderByIdQuery } from "@/redux/features/order/orderApi";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "@/redux/api/apiSlice";
import {
  useCancelOrderMutation,
  useTrackOrderQuery,
} from "@/redux/features/order/orderApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import OrderTrackingComponent from "@/components/OrderTrackingCompoent";

const SingleOrder = ({ params }) => {
  const { accessToken } = useSelector((state) => state.auth); // Retrieve access token from Redux
  const { data: orders } = useGetUserOrdersQuery(accessToken, {
    skip: !accessToken, // Skip query if accessToken is not available
  });
  const router = useRouter(); // For navigation

  useEffect(() => {
    if (!accessToken) {
      router.push("/login"); // Redirect to login if no access token
    }
  }, [accessToken, router]);

  const { id: orderId } = router.query; // Extract `id` from query params
  const printRef = useRef();
  const { data, isError, isLoading } = useGetUserOrderByIdQuery({
    id: orderId,
    accessToken: accessToken,
  });

  const [isCanceled, setIsCanceled] = useState(false); // State to track order cancellation

  useEffect(() => {
    // Retrieve canceled status from localStorage
    const canceledStatus = localStorage.getItem(`canceled_${orderId}`);
    if (canceledStatus) {
      setIsCanceled(JSON.parse(canceledStatus)); // Set state from localStorage
    }
  }, [orderId]);

  const [cancelOrder, { isLoading: isCanceling }] = useCancelOrderMutation();

  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder({
        order_id: orderId,
        accessToken,
      }).unwrap();

      if (response.status === "success") {
        notifySuccess(response.message);
        setIsCanceled(true);
        localStorage.setItem(`canceled_${orderId}`, true); // Save state to localStorage
      } else {
        notifyError("Failed to cancel order. Please try again.");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      notifyError("Failed to cancel order.");
    }
  };

  const [trackOrderId, setTrackOrderId] = useState(false);

  const handleTrackOrder = () => {
    setTrackOrderId(!trackOrderId);
  };

  let content = null;

  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }

  if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && data) {
    const order = data.order;

    if (order) {
      const {
        email,
        address,
        state,
        city,
        pincode,
        country,
        phone_number,
        products,
        price,
        payment_type,
        created_at,
        status, // Get the status of the order
      } = order;

      content = (
        <>
          <section className="invoice__area pt-120 pb-120">
            <div className="container">
              <div
                ref={printRef}
                className="invoice__wrapper grey-bg-2 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper"
              >
                <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="invoice__header pb-20">
                        <div className="row align-items-end">
                          <div
                            style={{
                              backgroundColor: "#990100",
                              borderRadius: "10px",
                            }}
                            className="col-md-12 col-sm-6"
                          >
                            <div className="invoice__left pt-10">
                              <Image
                                src={logo}
                                height={100}
                                width={100}
                                alt="logo"
                              />
                              <p className="mt-15" style={{ color: "white" }}>
                                83, Mahaveer Complex, <br /> Kurukshetra 136118
                                Haryana
                              </p>
                            </div>
                            <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                              <h3
                                style={{ color: "white" }}
                                className="text-uppercase font-70 "
                              >
                                Invoice
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice__customer mb-30">
                  <div className="row ">
                    <div className="col-md-6 col-sm-8">
                      <div className="invoice__customer-details d-flex flex-column flex-sm-row flex-wrap w-100 gap-sm-2">
                        <h5 className="mb-10 text-uppercase w-100">{email}</h5>
                        <p className="mb-0 text-uppercase w-100">{country}</p>
                        <p className="mb-0 text-uppercase w-100">{city}</p>
                        <p className="mb-0 w-100">{phone_number}</p>
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-4">
                      <div className="invoice__details mt-md-0 mt-20 text-md-end">
                        <p className="mb-0">
                          <strong>Invoice ID:</strong> #{order.order_id}
                        </p>
                        <p className="mb-0">
                          <strong>Date:</strong>{" "}
                          {dayjs(created_at).format("MMMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice__order-table pt-30 pb-30 pl-10 pr-10 bg-white mb-30 table-responsive">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {products?.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.product_id}</td>
                          <td>{item.quantity}</td>
                          <td>₹{Number(item.price).toFixed(2)}</td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="invoice__total pt-40 pb-10 alert-success pl-0 pr-0 mb-30">
                  <div className="row">
                    <div className="col-lg-3 col-md-4">
                      <div className="invoice__payment-method mb-30">
                        <h5 className="mb-0">Payment Method</h5>
                        <p className="tp-font-medium text-uppercase">
                          {payment_type}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                      <div className="invoice__total-ammount mb-30">
                        <h5 className="mb-0">Total Amount</h5>
                        <p className="tp-font-medium text-danger">
                          <strong>₹{parseFloat(price).toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-4 mb-3">
                      {/* Only show buttons if the order is not canceled */}
                      {!isCanceled && status !== "canceled" && (
                        <>
                          <button
                            type="button"
                            className="tp-btn mb-5 tp-btn-danger me-3"
                            onClick={handleCancelOrder}
                          >
                            Cancel Order
                          </button>
                          <button
                            type="button"
                            className="tp-btn tp-btn-primary"
                            onClick={handleTrackOrder}
                          >
                            {trackOrderId ? "Hide" : "Track"} Order
                          </button>
                        </>
                      )}
                      {isCanceled || status === "canceled" ? (
                        <p className="text-danger">This order has been canceled</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                {trackOrderId && <OrderTrackingComponent />}
              </div>

              <div className="invoice__print text-end mt-3">
                <div className="row">
                  <div className="col-xl-12">
                    <ReactToPrint
                      trigger={() => (
                        <button
                          type="button"
                          className="tp-invoice-print tp-btn tp-btn-black"
                        >
                          <span className="mr-5">
                            <i className="fa-regular fa-print"></i>
                          </span>{" "}
                          Print
                        </button>
                      )}
                      content={() => printRef.current}
                      documentTitle="Invoice"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  return (
    <Wrapper>
      <SEO pageTitle="Invoice" />
      <HeaderTwo style_2={true} />
      {content}
      <Footer />
    </Wrapper>
  );
};

export default SingleOrder;
