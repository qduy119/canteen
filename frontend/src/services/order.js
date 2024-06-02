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
            providesTags: (result, error, id) => [{ type: "Order", id }],
        }),
        getAllOrderByUserId: builder.query({
            query: (payload) => ({
                url: `/api/order?userId=${payload.userId}&page=${payload.page}&per_page=${payload.per_page}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: "OrderUser", id })),
                          "OrderUser",
                      ]
                    : ["OrderUser"],
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: `/api/order`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Orders", id })),
                          "Orders",
                      ]
                    : ["Orders"],
        }),
        cancelOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/api/order/cancel/${id}`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Orders", id: arg.id },
                { type: "OrderUser", id: arg.id },
            ],
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
            invalidatesTags: (result, error, arg) => [
                { type: "Orders", id: arg.id },
                { type: "OrderUser", id: arg.id },
            ],
        }),
        deleteOrder: builder.mutation({
            query: (payload) => ({
                url: `/api/order/${payload.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders", "OrderUser"],
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
