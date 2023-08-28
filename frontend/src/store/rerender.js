import { createSlice } from "@reduxjs/toolkit";

const intialstore = {val:1};

const rerenderSlice = createSlice({
    name: "rerender",
    initialState: {val:1},
    reducers: {
        rerender: (state) => {
            console.log("rerender");
            state.val =-1*state.val;
        }
    }
})

export const rerenderActions = rerenderSlice.actions;
export const rerenderReducers = rerenderSlice.reducer;
