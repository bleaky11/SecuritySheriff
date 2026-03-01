import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    started: Boolean,

};



const investigationState = createSlice({
    name: "Investigation",
    initialState,
    reducers: {
        investigate: (state, action) => {
            // placeholder function
        }
    }
});


export const {investigate} = gameOverState.actions;
export default investigationState.reducer;