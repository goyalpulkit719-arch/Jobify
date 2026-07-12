import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: true,
        role: "candidate",
        id: "6a4cdeec4728fc3622e42e8e",
        name: "",
        avatar: "",
    },
    reducer: {
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.id = action.payload.id;
            if(action.playload.name)state.name = action.payload.name;
            if(action.playload.avatar)state.avatar = action.payload.avatar;
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

export const authActions = authSlice.actions;
export default authSlice;