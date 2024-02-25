import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const orderItemApi = createApi({
    reducerPath: "orderItemApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        addOrderItems: builder.mutation({
            query: (payload) => ({
                url: "/api/order-item",
                method: "POST",
                body: payload,
            }),
        }),
        checkRating: builder.query({
            query: ({ id }) => ({
                url: `/api/order-item/check-rating/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useAddOrderItemsMutation,
    useCheckRatingQuery,
    useLazyCheckRatingQuery,
} = orderItemApi;

export default orderItemApi;
