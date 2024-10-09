import { apiSlice } from "@/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get available offer coupons
    getOfferCoupons: builder.query({
      query: () => `https://apiv2.mysweetwishes.com/api/coupons/available`,
      providesTags: ["Coupon"],
      keepUnusedDataFor: 600,
    }),

    // Match and validate a coupon code
    matchCoupon: builder.mutation({
      query: ({ couponCode, accessToken }) => {
        // Create the payload
        const payload = {
          code: couponCode,
        };

   

        return {
          url: `https://apiv2.mysweetwishes.com/api/coupons/match`,
          method: "POST", // Ensuring it's a POST request
          body: payload, // Sending the payload in the body
          headers: {
            'Content-Type': 'application/json', // Specify content type
            'Authorization': `Bearer ${accessToken}`, // Include the access token
          },
        };
      },
    }),
  }),
});

export const { useGetOfferCouponsQuery, useMatchCouponMutation } = authApi;
