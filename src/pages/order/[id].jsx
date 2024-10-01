import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import logo from "@assets/img/logo/logo.svg";
import ErrorMsg from "@/components/common/error-msg";
import { useGetUserOrderByIdQuery } from "@/redux/features/order/orderApi";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "@/redux/api/apiSlice";

const SingleOrder = ({ params }) => {
  const { accessToken } = useSelector((state) => state.auth); // Retrieve access token from Redux
  const { data: orders } = useGetUserOrdersQuery(accessToken, {
    skip: !accessToken, // Skip query if accessToken is not available
  });
  const router = useRouter(); // For navigation


  console.log(accessToken, "orders", orders);

  // Handle any redirection if needed based on authentication or accessToken
  useEffect(() => {
    if (!accessToken) {
      router.push("/login"); // Redirect to login if no access token
    }
  }, [accessToken, router]);

  const orderId = params.id; // Extract the order ID from params
  const printRef = useRef();
  const { data, isError, isLoading } = useGetUserOrderByIdQuery({
    id: orderId,
    accessToken: accessToken,
  }); // Pass access token

  let content = null;

  console.log(data); // Log the entire response for debugging

  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }

  if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && data) {
    const order = data.order; // Directly access the order object

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
      } = order;

      content = (
        <>
          <section className="invoice__area pt-120 pb-120">
            <div className="container">
              <div className="invoice__msg-wrapper">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="invoice_msg mb-40">
                      <p className="text-black alert alert-success">
                        Thank you <strong>{email}</strong>! Your order has been
                        received!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={printRef}
                className="invoice__wrapper grey-bg-2 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper"
              >
                <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="invoice__header pb-20">
                        <div className="row align-items-end">
                          <div className="col-md-4 col-sm-6">
                            <div className="invoice__left">
                              <Image src={logo} alt="logo" />
                              <p>
                                2879 Elk Creek Road <br /> Stone Mountain,
                                Georgia{" "}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-8 col-sm-6">
                            <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                              <h3 className="text-uppercase font-70 mb-20">
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
                  <div className="row">
                    <div className="col-md-6 col-sm-8">
                      <div className="invoice__customer-details">
                        <h4 className="mb-10 text-uppercase">{email}</h4>
                        <p className="mb-0 text-uppercase">{country}</p>
                        <p className="mb-0 text-uppercase">{city}</p>
                        <p className="mb-0">{phone_number}</p>
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
                <div className="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white mb-30">
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
                          <td>${Number(item.price).toFixed(2)}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
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
                          <strong>${parseFloat(price).toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
    <>
      <Wrapper>
        <SEO pageTitle={"Order Details"} />
        <HeaderTwo style_2={true} />
        {/* content */}
        {content}
        {/* content */}
        {/* footer start */}
        <Footer primary_style={true} />
        {/* footer end */}
      </Wrapper>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default SingleOrder;
