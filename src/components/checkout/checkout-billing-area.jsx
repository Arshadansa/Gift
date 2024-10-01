import React from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";

const CheckoutBillingArea = ({ register, errors }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: `First Name is required!`,
                  })}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  defaultValue={user?.firstName}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: `Last Name is required!`,
                  })}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Country <span>*</span>
                </label>
                <input
                  {...register("country", { required: `Country is required!` })}
                  name="country"
                  id="country"
                  type="text"
                  placeholder="United States (US)"
                />
                <ErrorMsg msg={errors?.country?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Street address</label>
                <input
                  {...register("address", { required: `Address is required!` })}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="House number and street name"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Town / City</label>
                <input
                  {...register("city", { required: `City is required!` })}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="City"
                />
                <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>State <span>*</span></label> {/* Add label for State */}
                <input
                  {...register("state", { required: `State is required!` })} 
                  name="state"
                  id="state"
                  type="text"
                  placeholder="State"
                />
                <ErrorMsg msg={errors?.state?.message} /> {/* Display error for State */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Postcode ZIP</label>
                <input
                  {...register("zipCode", { required: `Zip Code is required!` })}
                  name="zipCode"
                  id="zipCode"
                  type="text"
                  placeholder="Postcode ZIP"
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Phone <span>*</span>
                </label>
                <input
                  {...register("contactNo", {
                    required: `Contact Number is required!`,
                  })}
                  name="contactNo"
                  id="contactNo"
                  type="text"
                  placeholder="Phone"
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Email address <span>*</span>
                </label>
                <input
                  {...register("email", { required: `Email is required!` })}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Order notes (optional)</label>
                <textarea
                  {...register("orderNote", { required: false })}
                  name="orderNote"
                  id="orderNote"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
