"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: typeof window !== "undefined" ? localStorage.getItem("user") : null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    userDetails: typeof window !== "undefined" ? localStorage.getItem("userDetails") : null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("user", action.payload);
            }
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
        },
        setDetails: (state, action) => {
            state.userDetails = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("userDetails", action.payload);
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.userDetails = null;
        },

    }
})
export const { setUser, setToken, logout, setDetails } = authSlice.actions;
export default authSlice.reducer;