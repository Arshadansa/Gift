import { apiSlice } from "../../api/apiSlice";
import { set_client_secret } from "./orderSlice";
import { useSelector } from "react-redux";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // createPaymentIntent
    createPaymentIntent: builder.mutation({
      query: (data) => {
        const { accessToken } = data; // Access token passed in data
        return {
          url: "https://apiv2.mysweetwishes.com/api/user/orders",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(set_client_secret(result.clientSecret));
        } catch (err) {
          // do nothing
        }
      },
    }),

    // saveOrder
    saveOrder: builder.mutation({
      query: (data) => {
        const { accessToken, ...rest } = data; // Destructure access token and rest of the data
      
        return {
          url: "https://apiv2.mysweetwishes.com/api/orders",
          method: "POST",
          body: rest, // Send the rest of the data without the accessToken
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ['UserOrders'],
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
  useCreatePaymentIntentMutation,
  useSaveOrderMutation,
  useGetUserOrderByIdQuery,
  useGetUserOrdersQuery,
} = authApi;
