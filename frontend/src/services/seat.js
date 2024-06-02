import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";
import { baseUrl } from "../utils";

const seatApi = createApi({
    reducerPath: "seatApi",
    baseQuery: axiosBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getAllSeatReservation: builder.query({
            query: () => ({
                url: "/api/seat-reservation",
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Seats"],
        }),
        addSeatReservation: builder.mutation({
            query: (payload) => ({
                url: "/api/seat-reservation",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Seats"],
        }),
        deleteSeatReservation: builder.mutation({
            query: (payload) => ({
                url: `/api/seat-reservation?seatNumber=${payload.seatNumber}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Seats"],
        }),
    }),
});

export const {
    useGetAllSeatReservationQuery,
    useLazyGetAllSeatReservationQuery,
    useAddSeatReservationMutation,
    useDeleteSeatReservationMutation,
} = seatApi;

export default seatApi;
