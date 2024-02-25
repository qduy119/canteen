import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        addCartItems: builder.mutation({
            query: (payload) => ({
                url: "/api/cart-item",
                method: "POST",
                body: payload,
            }),
        }),
        modifyCartItems: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/cart-item/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),
        deleteCartItems: builder.mutation({
            query: ({ id }) => ({
                url: `/api/cart-item/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useAddCartItemsMutation,
    useModifyCartItemsMutation,
    useDeleteCartItemsMutation,
} = cartApi;

export default cartApi;
