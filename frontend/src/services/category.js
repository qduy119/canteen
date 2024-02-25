import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: "/api/category",
                method: "GET",
            }),
            keepUnusedDataFor: 5
        }),
        addCategory: builder.mutation({
            query: (payload) => ({
                url: "/api/category",
                method: "POST",
                body: payload,
            }),
        }),
        modifyCategory: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/api/category/${id}`,
                method: "PUT",
                body: payload,
            }),
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/api/category/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useLazyGetAllCategoryQuery,
    useAddCategoryMutation,
    useModifyCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
