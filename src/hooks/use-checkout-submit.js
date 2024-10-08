import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useCreatePaymentIntentMutation,
  useSaveOrderMutation,
} from "@/redux/features/order/orderApi";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { useMatchCouponMutation } from "@/redux/features/coupon/couponApi";
import useCartInfo from "./use-cart-info";
import { notifySuccess } from "@/utils/toast";

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
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [matchCoupon] = useMatchCouponMutation();

  const [couponInfo, setCouponInfo] = useState();
  const [cartTotal, setCartTotal] = useState(total);
  const [discountAmount, setDiscountAmount] = useState(0); // Initialize to 0
  const [clientSecret, setClientSecret] = useState("");
  const [couponApplyMsg, setCouponApplyMsg] = useState("");

  const stripe = useStripe();
  const elements = useElements();
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
        console.log(response);

        // Check if the coupon is valid and meets the minimum price requirement
        if (response.valid) {
            if (total >= response.min_price) {
                setCouponApplyMsg(
                    `Coupon applied successfully! Discount: ₹${response.discount}`
                );
                console.log(response.discount);
                
               
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
    console.log(discountAmount);
    
    const discountTotal = discountAmount || 0;
    const totalValue = Math.max(Number(total) - discountTotal, 0); // Ensure non-negative total
    setCartTotal(totalValue);
    console.log("total discount",totalValue);

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
  
    const orderInfo = {
      products: cart_products.map((product) => ({
        product_id: product.id,
        quantity: product.orderQuantity,
        price: product.price,
      })),
      email: data.email,
      address: data.address,
      state: data.state,
      city: data.city,
      pincode: data.zipCode,
      country: data.country,
      phone_number: data.contactNo,
      price: cartTotal, // Should be the updated total
      payment_type: data.payment,
      coupon_used: couponInfo || null, // Capture the coupon if used
      accessToken,
    };
  
    try {
      if (data.payment === "Card") {
        await handlePaymentWithStripe(orderInfo);
        // Notify user after payment is successful
        notifySuccess("Your payment was successful! Your order is being processed.");
      } else if (data.payment === "cod") {
        const res = await saveOrder(orderInfo);
        if (res?.error) {
          console.error("Error saving order:", res.error);
        } else {
          localStorage.removeItem("cart_products");
          notifySuccess("Your Order Confirmed! Thank you for your purchase!"); // Notify when the order is confirmed
          router.push(`/order/${res.data?.order?.order_id}`); // Redirect to the order confirmation page
        }
      }
    } catch (error) {
      console.error("Error during order submission:", error);
      // Optionally, notify the user of the error
      notifyError("There was an error placing your order. Please try again.");
    }
  };
  
  

  // Handle payment with Stripe
  const handlePaymentWithStripe = async (order) => {
    try {
      const { paymentIntent, error: intentErr } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.firstName,
              email: user?.email,
            },
          },
        });

      if (intentErr) {
        notifyError(intentErr.message);
        return;
      }

      const orderData = {
        ...order,
        paymentIntent_id: paymentIntent.id,
      };

      const res = await saveOrder(orderData);
      if (res?.error) {
        console.error("Error saving order:", res.error);
      } else {
        localStorage.removeItem("cart_products");
        notifySuccess("Your Order Confirmed!");
        router.push(`/order/${res.data?.order?.order_id}`);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      notifyError("Payment failed, please try again");
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
    handlePaymentWithStripe
  };
};

export default useCheckoutSubmit;
