import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `https://apiv2.mysweetwishes.com/api/products`,
      providesTags:['Products']
    }),
    getProductType: builder.query({
      query: (type) => `https://apiv2.mysweetwishes.com/api/products/category/${type}`, 
      providesTags: ['ProductType'],
    }),
    
    getOfferProducts: builder.query({
      query: (type) => `https://apiv2.mysweetwishes.com/api/products/offer?type=${type}`,
      providesTags:['OfferProducts']
    }),
    getPopularProductByType: builder.query({
      query: (type) => `https://apiv2.mysweetwishes.com/api/products/popular/${type}`,
      providesTags:['PopularProducts']
    }),
    getTopRatedProducts: builder.query({
      query: () => `https://apiv2.mysweetwishes.com/api/products/top-rated`,
      providesTags:['TopRatedProducts']
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `https://apiv2.mysweetwishes.com/api/products/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id:arg },
      ],
    }),
    //get related products
    getRelatedProducts: builder.query({
      query: (id) => `https://apiv2.mysweetwishes.com/api/products/category/${String(id)}`, // Ensure id is a string in the URL
      providesTags: (result, error, arg) => [
        { type: 'products', id: Number(arg) }, // Ensure arg is a string for the tag
      ],
    }),
    
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
 useGetRelatedProductsQuery,
} = productApi;
