import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth";
import applicationSlice from "./application";


const store = configureStore({reducer: {
    auth: authSlice.reducer,
    application: applicationSlice.reducer,
}})


export default store;