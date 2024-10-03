import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
//internal import
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { set_coupon } from "@/redux/features/coupon/couponSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import {useCreatePaymentIntentMutation,useSaveOrderMutation} from "@/redux/features/order/orderApi";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";
import { useGetUserOrdersQuery } from "@/redux/api/apiSlice";

const useCheckoutSubmit = () => {
  const router = useRouter();
  const { accessToken,user } = useSelector((state) => state.auth); // Retrieve access token from Redux

  const { data: orders, error,  } = useGetUserOrdersQuery(accessToken, {
    skip: !accessToken, // Skip query if accessToken is not available
  });

  console.log(accessToken,"orders");
  
  // Handle any redirection if needed based on authentication or accessToken
  useEffect(() => {
    if (!accessToken) {
      router.push("/login"); // Redirect to login if no access token
    }
  }, [accessToken, router]);


  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();


  // addOrder
  const [saveOrder, {}] = useSaveOrderMutation();
  // createPaymentIntent
  const [createPaymentIntent, {}] = useCreatePaymentIntentMutation();
  // cart_products
  const { cart_products } = useSelector((state) => state.cart);
  // user

  // shipping_info
  const { shipping_info } = useSelector((state) => state.order);
  // total amount
  const { total, setTotal } = useCartInfo();
  // couponInfo
  const [couponInfo, setCouponInfo] = useState({});
  //cartTotal
  const [cartTotal, setCartTotal] = useState("");
  // minimumAmount
  const [minimumAmount, setMinimumAmount] = useState(0);
  // shippingCost
  const [shippingCost, setShippingCost] = useState(0);
  // discountAmount
  const [discountAmount, setDiscountAmount] = useState(0);
  // discountPercentage
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // discountProductType
  const [discountProductType, setDiscountProductType] = useState("");
  // isCheckoutSubmit
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  // cardError
  const [cardError, setCardError] = useState("");
  // clientSecret
  const [clientSecret, setClientSecret] = useState("");
  // showCard
  const [showCard, setShowCard] = useState(false);
  // coupon apply message
  const [couponApplyMsg,setCouponApplyMsg] = useState("");

  const dispatch = useDispatch();
  
  const stripe = useStripe();
  const elements = useElements();

  const {register,handleSubmit,setValue,formState: { errors }} = useForm();

  let couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    const result = cart_products?.filter(
      (p) => p.productType === discountProductType
    );
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) =>
        preValue + currentValue.price * currentValue.orderQuantity,
      0
    );
    let totalValue = "";
    let subTotal = Number((total + shippingCost).toFixed(2));
    let discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    totalValue = Number(subTotal - discountTotal);
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
    discountAmount,
    cartTotal,
  ]);

  // create payment intent
  useEffect(() => {
    if (cartTotal) {
      createPaymentIntent({
        price: parseInt(cartTotal),
      })
        .then((data) => {
          setClientSecret(data?.data?.clientSecret);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [createPaymentIntent, cartTotal]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();
  
    // Check if a coupon code is inputted
    if (!couponRef.current?.value) { // Access the value property directly
      notifyError("Please Input a Coupon Code!");
      return;
    }
  
    // Check if loading
    if (isLoading) {
      return <h3>Loading...</h3>;   
    }
  
    // Check for any errors
    if (isError) {
      notifyError("Something went wrong");
      return;
    }
  
    // Filter the available coupons based on the inputted code
    const result = offerCoupons?.filter(
      (coupon) => coupon.code === couponRef.current.value // Access the new code property
    );
  
    // Validate the result
    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }
  
    // Check if the coupon is expired
    if (dayjs().isAfter(dayjs(result[0]?.expiry_date))) {
      notifyError("This coupon is not valid!");
      return;
    }
  
    // Check for the minimum amount requirement
    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required to apply this coupon!`
      );
      return;
    } else {
      // Update the state and dispatch the coupon
      setCouponApplyMsg(`Your Coupon ${result[0].code} is Applied!`);
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountPercentage(result[0].discount); // Use the discount value from the new structure
      dispatch(set_coupon(result[0])); // Dispatch the coupon
  
      // Reset coupon input and message after a timeout
      setTimeout(() => {
        couponRef.current.value = ""; // Clear the input
        setCouponApplyMsg(""); // Clear the message
      }, 5000);
    }
  };
  

  // handleShippingCost
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("country", shipping_info.country);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("state", shipping_info.state); // Add this line to set the state
    setValue("zipCode", shipping_info.zipCode);
    setValue("contactNo", shipping_info.contactNo);
    setValue("email", shipping_info.email);
    setValue("orderNote", shipping_info.orderNote);
    setValue('coupon',shipping_info.coupon)
  }, [user, setValue, shipping_info, router]);
  

  // submitHandler
  const submitHandler = async (data) => {

    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);
    console.log(data,"sunmit acess");
    
  
    // Construct the order information
    const orderInfo = {
      products: cart_products.map(product => ({
        product_id: product.id, // Assuming cart_products contains product_id
        quantity: product.orderQuantity, // Assuming orderQuantity is in the cart_products
        price: product.price, // Assuming price is part of the product object
      })),
      email: data.email,
      address: data.address,
      state: data.state, // Capture the state from the form
      city: data.city,
      pincode: data.zipCode, // Assuming zipCode is captured in your form
      country: data.country,
      phone_number: data.contactNo, // Assuming contactNo is captured in your form
      price: total, // Total price calculation
      payment_type: data.payment, // Assuming payment method is selected in your form
      coupon_used: data.coupon || null, // Capture the coupon if used
      accessToken
    };
  
    // Handle Card Payment
    if (data.payment === 'Card') {
      // (Existing card payment logic)
    }
  
    // Handle COD Payment
    if (data.payment === 'cod') {
      await saveOrder(orderInfo).then(res => {
        if (res?.error) {
          console.error("Error saving order:", res.error);
        } else {
          localStorage.removeItem("cart_products");
          localStorage.removeItem("couponInfo");
          setIsCheckoutSubmit(false);
          notifySuccess("Your Order Confirmed!");
          router.push(`/order/${res.data?.order?.order_id}`);
        }
      });
    }
  };
  
  

  // handlePaymentWithStripe
  const handlePaymentWithStripe = async (order) => {
    try {
      const {paymentIntent, error:intentErr} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.firstName,
              email: user?.email,
            },
          },
        },
      );
      if (intentErr) {
        notifyError(intentErr.message);
      } else {
        // notifySuccess("Your payment processed successfully");
      }

      const orderData = {
        ...order,
        paymentIntent,
      };

      saveOrder({
        ...orderData
      })
      .then((result) => {
          if(result?.error){
          }
          else {
            localStorage.removeItem("couponInfo");
            notifySuccess("Your Order Confirmed!");
            router.push(`/order/${result.data?.order?._id}`);
          }
        })
       } 
    catch (err) {
      console.log(err);
    }
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    cardError,
    submitHandler,
    stripe,
    handleSubmit,
    clientSecret,
    setClientSecret,
    cartTotal,
    isCheckoutSubmit,
    couponApplyMsg,
    showCard,
    setShowCard,
  };
};

export default useCheckoutSubmit;
