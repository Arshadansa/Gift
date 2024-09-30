import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEXT_PUBLIC_API_BASE_URL = 'https://api.mysweetwishes.com/api/';

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      try {
        const userInfo = Cookies.get('userInfo');
        console.log(userInfo, "----------------------");

        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
      return headers;
    },
  }),
  tagTypes: ["HeroSections", "Products", "UserOrders", "Product"],
  endpoints: (builder) => ({
    // Fetch Hero Slider data
    getHeroSliderData: builder.query({
      query: () => 'hero-sections',  // API endpoint for hero slider
      providesTags: ['HeroSections'],
    }),

    // Other example endpoints
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    getUserOrders: builder.query({
      query: () => '/user/orders',
      providesTags: ['UserOrders'],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
  }),
});

// Export hooks for the endpoints
export const { 
  useGetHeroSliderDataQuery, 
  useGetProductsQuery, 
  useGetUserOrdersQuery, 
  useGetProductByIdQuery 
} = apiSlice;
