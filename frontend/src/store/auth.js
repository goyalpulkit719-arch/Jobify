import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        role: "",
        id: "",
        name: "",
        avatar: "",
    },
    reducers: {
        update: (state, action) => {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.id = action.payload.id;
            if(action.payload.name)state.name = action.payload.name;
            if(action.payload.avatar)state.avatar = action.payload.avatar;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = null;
            state.id = null;
            state.name = "";
            state.avatar = "";
        },
    }
});

export const { update, logout } = authSlice.actions;
export default authSlice;