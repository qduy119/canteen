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
        updateUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

const { reducer, actions } = authSlice;

export const { loginSuccess, logoutSuccess, updateAccessToken, updateUser } =
    actions;
export default reducer;
