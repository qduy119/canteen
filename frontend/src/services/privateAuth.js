import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const privateAuthApi = createApi({
    reducerPath: "privateAuthApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: ({ id }) => ({
                url: `/api/user/${id}`,
            }),
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/api/user",
            }),
            keepUnusedDataFor: 5,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "User", id })),
                          "User",
                      ]
                    : ["User"],
        }),
        addUser: builder.mutation({
            query: (payload) => ({
                url: "/register",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["User"],
        }),
        modifyUser: builder.mutation({
            query: (payload) => ({
                url: `/api/user/${payload.id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        deleteUser: builder.mutation({
            query: (payload) => ({
                url: `/api/user/${payload.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                options: {
                    withCredentials: true,
                },
            }),
        }),
    }),
});

export const {
    useLogoutMutation,
    useLazyGetAllUserQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useGetAllUserQuery,
    useAddUserMutation,
    useModifyUserMutation,
    useDeleteUserMutation,
} = privateAuthApi;
export default privateAuthApi;
