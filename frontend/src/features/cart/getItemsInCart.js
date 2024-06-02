import { createAsyncThunk } from "@reduxjs/toolkit";
import createAxiosInstance from "../../api/axios";

const getItemsInCart = createAsyncThunk(
    "cart/getItems",
    async (payload, thunkAPI) => {
        try {
            const { userId } = payload;
            const privateAxios = createAxiosInstance();
            const res = await privateAxios.get(
                `/api/cart-item?userId=${userId}`,
                {
                    signal: thunkAPI.signal,
                }
            );
            return res.data;
        } catch (error) {
            return {
                error: {
                    status: error.response?.status,
                    data: error.response?.data || error.message,
                },
            };
        }
    }
);

export default getItemsInCart;
