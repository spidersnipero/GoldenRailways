import { configureStore } from "@reduxjs/toolkit";
import { loginReducers } from "./auth/auth";
import { rerenderReducers } from "./rerender";

export const store = configureStore({
    
    reducer: {
        login:loginReducers,
        rerender:rerenderReducers
    }
});