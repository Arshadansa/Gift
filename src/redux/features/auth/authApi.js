import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";

const BASE_URL = "https://apiv2.mysweetwishes.com/api/";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}register`,
        method: "POST",
        body: data,
      }),
    }),
    // signUpProvider
    signUpProvider: builder.mutation({
      query: (token) => ({
        url: `${BASE_URL}register/${token}`,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // Handle error if needed
        }
      },
    }),
    // login
   // loginUser mutation
loginUser: builder.mutation({
  query: (data) => ({
    url: `${BASE_URL}login`,
    method: "POST",
    body: data,
  }),
  // Remove onQueryStarted logic here to avoid double saving cookies
}),

    // get me
    getUser: builder.query({
      query: () => {
        const token = Cookies.get("userInfo")?JSON.parse(Cookies.get("userInfo")).accessToken : '';
        return {
          url: `${BASE_URL}is-logged-in`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
    
          // Dispatch userLoggedIn to sync Redux state
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,  // Assuming API response returns updated token
              user: result.data.data.user,
            })
          );
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      },
    }),
    
    
    // confirmEmail
    confirmEmail: builder.query({
      query: (token) => ({
        url: `${BASE_URL}user/confirmEmail/${token}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // Handle error if needed
        }
      },
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}user/forget-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    confirmForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/user/confirm-forget-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: ({ current_password, new_password, new_password_confirmation, accessToken }) => ({
        url: `${BASE_URL}change-password`,
        method: "POST",
        body: {
          current_password,
          new_password,
          new_password_confirmation,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    
    // updateProfile
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BASE_URL}user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // Handle error if needed
        }
      },
    }),
    // blog 
    fetchBlogs: builder.query({
      query: ({ page = 1, perPage = 10 }) => `${BASE_URL}blog/blogs-${page}-${perPage}`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useFetchBlogsQuery,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
  useGetUserQuery, 
} = authApi;
