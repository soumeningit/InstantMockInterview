"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/redux/slices/authSlice"
import questionsandanswersReducer from "@/app/redux/slices/quesandansSlice"

export const store = configureStore({
    reducer: {
        // Add reducers here
        auth: authReducer,
        questionsandanswers: questionsandanswersReducer
    }
})