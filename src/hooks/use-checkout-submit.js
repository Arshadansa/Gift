import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useCreateRazorpayOrderMutation,
  useSaveOrderMutation,
} from "@/redux/features/order/orderApi";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { useMatchCouponMutation } from "@/redux/features/coupon/couponApi";
import useCartInfo from "./use-cart-info";
import { notifyError, notifySuccess } from "@/utils/toast";

const useCheckoutSubmit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const couponRef = useRef(null); // Make sure this line is present

  const { accessToken, user } = useSelector((state) => state.auth);
  const { cart_products } = useSelector((state) => state.cart);
  const { shipping_info } = useSelector((state) => state.order);
  const { total } = useCartInfo(); // Assuming total is derived from useCartInfo

  // Payment and coupon states
  const [saveOrder] = useSaveOrderMutation();
  const [createPaymentIntent] = useCreateRazorpayOrderMutation();
  const [matchCoupon] = useMatchCouponMutation();

  const [couponInfo, setCouponInfo] = useState();
  const [cartTotal, setCartTotal] = useState(total);
  const [discountAmount, setDiscountAmount] = useState(0); // Initialize to 0
  const [clientSecret, setClientSecret] = useState("");
  const [couponApplyMsg, setCouponApplyMsg] = useState("");

  // const stripe = useStripe();
  // const elements = useElements();
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  // Handle coupon code
  const handleCouponCode = async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Check if couponRef and its current value are defined
    if (!couponRef.current || !couponRef.current.value) {
      setCouponApplyMsg("Please enter a coupon code.");
      return;
    }

    const couponCode = couponRef.current.value; // Get the coupon code from the input
    setCouponInfo(couponCode); // Save coupon details
    try {
      const response = await matchCoupon({ couponCode }).unwrap();

      // Check if the coupon is valid and meets the minimum price requirement
      if (response.valid) {
        if (total >= response.min_price) {
          setCouponApplyMsg(
            `Coupon applied successfully! Discount: ₹${response.discount}`
          );

          setDiscountAmount(parseFloat(response.discount)); // Ensure it's parsed as a float
        } else {
          setCouponApplyMsg(
            `Coupon is valid but requires a minimum total of ₹${response.min_price}.`
          );
        }
      } else {
        setCouponApplyMsg("Coupon is not valid.");
      }
    } catch (error) {
      setCouponApplyMsg(`Failed to apply coupon: ${error.message}`);
    }
  };

  // Calculate total and discount value
  useEffect(() => {
    const discountTotal = discountAmount || 0;
    const totalValue = Math.max(Number(total) - discountTotal, 0); // Ensure non-negative total
    setCartTotal(totalValue);
  }, [total, discountAmount]);

  // Create payment intent
  useEffect(() => {
    if (cartTotal) {
      createPaymentIntent({ price: Math.round(cartTotal) }) // Use Math.round to avoid floating-point issues
        .then((data) => {
          setClientSecret(data?.data?.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [createPaymentIntent, cartTotal]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

  // Set values in the form
  useEffect(() => {
    if (shipping_info) {
      setValue("firstName", shipping_info.firstName);
      setValue("lastName", shipping_info.lastName);
      setValue("country", shipping_info.country);
      setValue("address", shipping_info.address);
      setValue("city", shipping_info.city);
      setValue("state", shipping_info.state);
      setValue("zipCode", shipping_info.zipCode);
      setValue("contactNo", shipping_info.contactNo);
      setValue("email", shipping_info.email);
      setValue("orderNote", shipping_info.orderNote);
    }
  }, [shipping_info, setValue]);

  // Submit handler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));

    // Construct the products array
    const products = cart_products
      .map((product) => ({
        product_id: product.product_id, // Use the full product_id without conversion
        quantity: product.orderQuantity,
        price: product.price, // Ensure price is a number
      }))
      .filter(
        (product) => product.product_id && product.quantity && product.price // Ensure no empty fields
      );

    if (products.length === 0) {
      notifyError("No valid products in cart.");
      return; // Exit if there are no valid products
    }

    const orderInfo = {
      products,
      email: data.email,
      address: data.address,
      state: data.state,
      city: data.city,
      pincode: data.zipCode,
      country: data.country,
      phone_number: data.contactNo,
      price: cartTotal,
      payment_type: data.payment,
      coupon_used: couponInfo || null,
      first_name: data.firstName, // Add first name separately
      last_name: data.lastName, // Add last name separately
      accessToken,
    };

    try {
      if (data.payment === "online") {
        await handlePaymentWithRazorpay(orderInfo);
        // notifySuccess("Your payment was successful! Your order is being processed.");
      } else if (data.payment === "cod") {
        const res = await saveOrder(orderInfo);
        notifySuccess("Your Order Confirmed! Thank you for your purchase!");

        if (res?.error) {
          console.error("Error saving order:", res.error);
        } else {
          localStorage.removeItem("cart_products");
          router.push(`/order/${res.data?.order_id}`);
        }
      }
    } catch (error) {
      console.error("Error during order submission:", error);
      notifyError("There was an error placing your order. Please try again.");
    }
  };

  // Handle payment with Razorpay
  const handlePaymentWithRazorpay = async (orderInfo) => {
    try {
      // Check if orderInfo is provided
      if (!orderInfo) {
        notifyError("Order information is missing. Please try again.");
        return;
      }

      // Create a Razorpay order on the server
      const orderResponse = await createPaymentIntent(orderInfo);
      if (!orderResponse || orderResponse.data?.status !== "success") {
        notifyError("Failed to initiate payment. Please try again.");
        return;
      }

      // Set Razorpay options
      const options = {
        key: "rzp_live_2sTBLvpxef5qxP", // Razorpay Key ID
        amount: orderResponse.data.amount, // Amount from server in paise
        currency: "INR",
        name: "MySweetWishes",
        description: "Order Payment",
        order_id: orderResponse.data.razorpay_order_id, // Order ID
        handler: async (response) => {
          await verifyAndSaveOrder(response, orderInfo);
        },
        prefill: {
          name: `${orderInfo.first_name} ${orderInfo.last_name}`,
          email: orderInfo.email,
          contact: orderInfo.phone_number,
        },
        notes: {
          address: orderInfo.address,
        },
        theme: {
          color: "#F37254", // Customize the color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      notifyError("Failed to initiate payment. Please try again.");
    }
  };

  // Separate function to handle payment verification
  const verifyAndSaveOrder = async (response, orderInfo) => {
    try {
      // Step 1: Send payment details to backend for verification
      const verifyResponse = await fetch(
        "https://apiv2.mysweetwishes.com/api/verifypayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderInfo.accessToken}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        }
      );

      const verifyData = await verifyResponse.json();

      // Step 2: Check if the payment was verified successfully
      if (verifyData.status === "success") {
        notifySuccess("Your payment has been verified successfully!");

        // Step 3: Save the order details after payment verification
        const saveOrderResponse = await saveOrder(orderInfo);
        if (!saveOrderResponse?.error) {
          localStorage.removeItem("cart_products");
          router.push(`/order/${saveOrderResponse.data?.order_id}`);
        } else {
          notifyError("Error saving order. Please try again.");
        }
      } else {
        notifyError("Payment verification failed. Please try again.");
      }
    } catch (error) {
      notifyError("Payment verification request failed. Please try again.");
    }
  };

  return {
    register,
    handleCouponCode, // Expose coupon code handler
    handleSubmit,
    submitHandler,
    errors,
    couponApplyMsg,
    cartTotal,
    discountAmount,
    couponRef,
    handlePaymentWithRazorpay,
  };
};

export default useCheckoutSubmit;
