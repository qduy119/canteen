import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        createPaymentUrl: builder.mutation({
            query: (payload) => ({
                url: "/api/create-payment-url",
                method: "POST",
                body: payload,
            }),
        }),
        getAllPayment: builder.query({
            query: () => ({
                url: `/api/payment`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        getPayment: builder.query({
            query: ({ userId }) => ({
                url: `/api/payment?userId=${userId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        addPayment: builder.mutation({
            query: (payload) => ({
                url: "/api/payment",
                method: "POST",
                body: payload,
            }),
        }),
        modifyPayment: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/payment/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetAllPaymentQuery,
    useLazyGetAllPaymentQuery,
    useLazyGetPaymentQuery,
    useGetPaymentQuery,
    useAddPaymentMutation,
    useModifyPaymentMutation,
    useCreatePaymentUrlMutation,
} = paymentApi;

export default paymentApi;
