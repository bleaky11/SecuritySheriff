import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    started: Boolean,
    
};



const investigationState = createSlice({
    name: "Investigation",
    initialState,
    reducers: {
        startInvestigate: (state, action) => {
            // should make all of the buttons available on screen
        }
    }
});


export const { startInvestigate } = investigationState.actions;
export default investigationState.reducer;