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
        }),
        addSeatReservation: builder.mutation({
            query: (payload) => ({
                url: "/api/seat-reservation",
                method: "POST",
                body: payload,
            }),
        }),
        deleteSeatReservation: builder.mutation({
            query: (payload) => ({
                url: `/api/seat-reservation?seatNumber=${payload.seatNumber}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useLazyGetAllSeatReservationQuery,
    useAddSeatReservationMutation,
    useDeleteSeatReservationMutation,
} = seatApi;

export default seatApi;
