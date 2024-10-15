import { apiSlice } from "../../api/apiSlice";
import { set_client_secret } from "./orderSlice";
import { useSelector } from "react-redux";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // createPaymentIntent
    createRazorpayOrder: builder.mutation({
      query: (orderInfo) => {
        const { accessToken, ...rest } = orderInfo; // Destructure access token and rest of the data
        return {
          url: "https://apiv2.mysweetwishes.com/api/initiate-order", // Your endpoint
          method: "POST",
          body: rest, // Send the entire orderInfo object
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(set_client_secret(result.clientSecret)); // Assuming you need to set client secret here
        } catch (err) {
          console.error("Error creating Razorpay order:", err);
        }
      },
    }),

    // saveOrder
    saveOrder: builder.mutation({
      query: (data) => {
        const { accessToken, ...rest } = data; // Destructure access token and rest of the data

        return {
          url: "https://apiv2.mysweetwishes.com/api/initiate-order",
          method: "POST",
          body: rest, // Send the rest of the data without the accessToken
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["UserOrders"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            localStorage.removeItem("couponInfo");
            localStorage.removeItem("cart_products");
            localStorage.removeItem("shipping_info");
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    // getUserOrders
    getUserOrders: builder.query({
      query: (accessToken) => {
        return {
          url: "https://apiv2.mysweetwishes.com/api/user/orders",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["UserOrders"],
      keepUnusedDataFor: 600,
    }),

    // getUserOrderById
    getUserOrderById: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `https://apiv2.mysweetwishes.com/api/orders/${id}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: (result, error, arg) => [{ type: "UserOrder", id: arg }],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useSaveOrderMutation,
  useGetUserOrderByIdQuery,
  useGetUserOrdersQuery,
} = authApi;
