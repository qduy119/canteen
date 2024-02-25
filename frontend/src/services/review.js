import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: (payload) => ({
                url: "/api/review",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const { useAddReviewMutation } = reviewApi;

export default reviewApi;
