import { createSlice } from "@reduxjs/toolkit";

const intialstore = {auth:false,
    authcred:{
    name:null,
    email:null,
    age:null,
    address:null,
    phoneno:null,
    },
    authtype:null
};

const loginSlice = createSlice({
    name: "login",
    initialState: {auth:false,
    authcred:{
    name:null,
    email:null,
    age:null,
    address:null,
    phoneno:null,
    },
    authtype:null
    },

    reducers: {
        login: (state) => {
            state.auth = true;
        },
        setauthcred : (state,action) => {
            state.authcred = action.payload;
        },
        setauthtype : (state,action) => {
            state.authtype = action.payload;
        },
        logout: () => intialstore
    }
})

export const loginActions = loginSlice.actions;
export const loginReducers = loginSlice.reducer;