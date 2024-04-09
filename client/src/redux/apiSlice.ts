import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { clearCredentials, setCredentials } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new access token
    const refreshResult = await baseQuery("/users/refresh", api, extraOptions);

    if (refreshResult.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // log out in we dont get data from refresh token request (i.e. token expired)
      api.dispatch(clearCredentials());

      /******************* DONT FORGET TO CHANGE ERROR MESSAGE TO SEND BACK TO SCREEN SO USER KNOWS WHAT HAPPENED *******************/
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Order"],
  endpoints: () => ({}),
});
