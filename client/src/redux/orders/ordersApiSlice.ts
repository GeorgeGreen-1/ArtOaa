import { apiSlice } from "../apiSlice";
import { IOrder } from "./order";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    getOrderByID: builder.query<IOrder, string>({
      query: (id) => `/orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIDQuery,
} = ordersApiSlice;
