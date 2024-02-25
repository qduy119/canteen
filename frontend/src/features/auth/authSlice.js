import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.accessToken = null;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload.newAccessToken;
        },
    },
    // extraReducers: (builder) => {
    // },
});

const { reducer, actions } = authSlice;

export const { loginSuccess, logoutSuccess, updateAccessToken } = actions;
export default reducer;
