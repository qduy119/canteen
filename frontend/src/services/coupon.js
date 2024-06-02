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
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Coupon", id })),
                          "Coupon",
                      ]
                    : ["Coupon"],
            // for a specific coupon: providesTags: (result, error, id) => [{ type: 'Coupon', id }],
        }),
        addCoupon: builder.mutation({
            query: (payload) => ({
                url: "/api/coupon",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Coupon"],
        }),
        modifyCoupon: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/coupon/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Coupon", id: arg.id },
            ],
        }),
        deleteCoupon: builder.mutation({
            query: ({ id }) => ({
                url: `/api/coupon/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Coupon"],
        }),
    }),
});

export const {
    useGetAllCouponQuery,
    useLazyGetAllCouponQuery,
    useAddCouponMutation,
    useModifyCouponMutation,
    useDeleteCouponMutation,
} = couponApi;

export default couponApi;
