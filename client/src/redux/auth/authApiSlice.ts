import { apiSlice } from "../apiSlice";
import { ILoggedUser } from "./auth";
import { clearCredentials, setCredentials, setUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          import.meta.env.VITE_NODE_ENV === "development" && console.log(err);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          dispatch(setUser(null));
          // dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          import.meta.env.VITE_NODE_ENV === "development" && console.log(err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          import.meta.env.VITE_NODE_ENV === "development" && console.log(err);
        }
      },
    }),

    getLoggedUser: builder.query<ILoggedUser, void>({
      query: () => ({
        url: "/users/profile",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          import.meta.env.VITE_NODE_ENV === "development" && console.log(err);
        }
      },
    }),

    verifyEmail: builder.mutation({
      query: (emailToken: string) => ({
        url: "/users/verify-email",
        method: "POST",
        body: { emailToken },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetLoggedUserQuery,
  useVerifyEmailMutation,
} = authApiSlice;
