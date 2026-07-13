import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    applications: [],
}

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setApplications(state, action) {
            state.applications = action.payload;
        },
        addApplication(state, action) {
            state.applications.push(action.payload);
        },        
        clearApplications(state) {
            state.applications = [];
        },
        removeApplication: (state, action) => {
            state.applications = state.applications.filter(
                application => application._id !== action.payload
        );
}
    }
})

export const { setApplications, addApplication, clearApplications, removeApplication } = applicationSlice.actions;
export default applicationSlice;