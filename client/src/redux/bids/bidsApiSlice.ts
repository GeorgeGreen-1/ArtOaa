import { apiSlice } from "../apiSlice";


export const bidsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBid: builder.mutation({
      query: ({orderId, ...bid}) => ({
        url: `/orders/${orderId}`,
        method: "POST",
        body: bid,
      }),
    }),
  }),
});

export const { useCreateBidMutation } = bidsApiSlice;
