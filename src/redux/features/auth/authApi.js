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
            { expires: 7 } // Adjusting to 7 days for consistency
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
    //login
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}login`,
        method: "POST",
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
            { expires: 7 } // Consistent expiration
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
    getUser: builder.query({
      query: () => {
        const token = Cookies.get("userInfo")
          ? JSON.parse(Cookies.get("userInfo")).accessToken
          : "";
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

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      },
    }),
    //conf email
    confirmEmail: builder.mutation({
      query: ({ data }) => {
        const token = Cookies.get("userInfo")
          ? JSON.parse(Cookies.get("userInfo")).accessToken
          : "";
    console.log(data,"reset");
    
        return {
          url: `${BASE_URL}reset-password`,
          method: "POST", // Change to POST or PUT based on your API requirements
          body: data, // Assuming `data` contains the necessary information for the mutation
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    

    //reset pass
    resetPassword: builder.mutation({
      query: (data) => {
        const token = Cookies.get("userInfo")
          ? JSON.parse(Cookies.get("userInfo")).accessToken
          : "";

        return {
          url: `${BASE_URL}initiate-password-reset`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
//verify
    confirmForgotPassword: builder.mutation({
      query: (data) => {
          console.log(data, "verify query data");
          const token = Cookies.get("userInfo")
              ? JSON.parse(Cookies.get("userInfo")).accessToken
              : "";
  
          return {
              url: `${BASE_URL}verify-otp`,
              method: "POST",
              body: data,
              headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the headers if needed
              },
          };
      },
  }),
  

    //change password
    changePassword: builder.mutation({
      query: ({
        current_password,
        new_password,
        new_password_confirmation,
        accessToken,
      }) => ({
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
    //update profile
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
            { expires: 7 } // Adjusting to 7 days for consistency
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
    //blogs
    fetchBlogs: builder.query({
      query: ({ page = 1, perPage = 10 }) =>
        `${BASE_URL}blog/blogs-${page}-${perPage}`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useFetchBlogsQuery,
  useConfirmEmailMutation,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
  useGetUserQuery,
} = authApi;
