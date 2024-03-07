import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const couponApi = createApi({
    reducerPath: "couponApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getAllCoupon: builder.query({
            query: () => ({
                url: "/api/coupon",
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        addCoupon: builder.mutation({
            query: (payload) => ({
                url: "/api/coupon",
                method: "POST",
                body: payload,
            }),
        }),
        modifyCoupon: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/coupon/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),
        deleteCoupon: builder.mutation({
            query: ({ id }) => ({
                url: `/api/coupon/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useLazyGetAllCouponQuery,
    useAddCouponMutation,
    useModifyCouponMutation,
    useDeleteCouponMutation,
} = couponApi;

export default couponApi;
