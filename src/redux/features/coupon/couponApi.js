import { apiSlice } from "@/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get available offer coupons
    getOfferCoupons: builder.query({
      query: () => `https://apiv2.mysweetwishes.com/api/coupons/available`,
      providesTags: ['Coupon'],
      keepUnusedDataFor: 600,
    }),

    // Match and validate a coupon code
    matchCoupon: builder.mutation({
      query: (couponCode) => ({
        url: `https://apiv2.mysweetwishes.com/api/coupons/match`,
        method: 'POST',
        body: {
          code: couponCode,  // The coupon code passed into the mutation
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetOfferCouponsQuery, useMatchCouponMutation } = authApi;
