import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const itemApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => ({
                url: "/api/item",
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Item", id })),
                          "Item",
                      ]
                    : ["Item"],
        }),
        getTopSales: builder.query({
            query: () => ({
                url: "/api/item/top5",
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        addProduct: builder.mutation({
            query: (payload) => ({
                url: "/api/item",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Item"],
        }),
        modifyProduct: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/item/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Item", id: arg.id },
            ],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/api/item/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Item"],
        }),
    }),
});

export const {
    useGetTopSalesQuery,
    useGetAllProductQuery,
    useLazyGetAllProductQuery,
    useAddProductMutation,
    useModifyProductMutation,
    useDeleteProductMutation,
} = itemApi;

export default itemApi;
