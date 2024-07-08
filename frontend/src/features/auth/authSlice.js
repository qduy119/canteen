import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        logoutSuccess: (state) => {
            state.accessToken = null;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload.newAccessToken;
        },
    },
});

const { reducer, actions } = authSlice;

export const { loginSuccess, logoutSuccess, updateAccessToken } = actions;
export default reducer;
