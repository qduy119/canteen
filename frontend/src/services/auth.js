import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: "/authenticate",
                method: "POST",
                body: payload,
                credentials: "include",
            }),
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: "/register",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;

export default authApi;
