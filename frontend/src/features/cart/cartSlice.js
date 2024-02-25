import { createSlice } from "@reduxjs/toolkit";
import getItemsInCart from "./getItemsInCart";

const initialState = {
    items: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.items = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getItemsInCart.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

const { reducer, actions } = cartSlice;

export const { resetCart } = actions;
export default reducer;
