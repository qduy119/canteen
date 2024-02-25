import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getOrder: builder.query({
            query: (payload) => ({
                url: `/api/order/${payload.orderId}`,
                method: "GET",
            }),
        }),
        getAllOrderByUserId: builder.query({
            query: (payload) => ({
                url: `/api/order?userId=${payload.userId}&page=${payload.page}&per_page=${payload.per_page}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: `/api/order`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        cancelOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/api/order/cancel/${id}`,
                method: "PUT",
            }),
        }),
        addOrder: builder.mutation({
            query: (payload) => ({
                url: "/api/order",
                method: "POST",
                body: payload,
            }),
        }),
        modifyOrder: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/order/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),
        deleteOrder: builder.mutation({
            query: (payload) => ({
                url: `/api/order/${payload.id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetOrderQuery,
    useGetAllOrderQuery,
    useLazyGetAllOrderQuery,
    useLazyGetAllOrderByUserIdQuery,
    useCancelOrderMutation,
    useAddOrderMutation,
    useModifyOrderMutation,
    useDeleteOrderMutation,
} = orderApi;

export default orderApi;
