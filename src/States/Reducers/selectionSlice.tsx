import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    inSelection: Boolean
};



const selectionState = createSlice({
    name: "Select",
    initialState,
    reducers: {
        Selection: (state, action) => {
            // start dialogue, play animations, reload AI output
            state.inSelection = action.payload;
        }
    }
});


export const {Selection} = selectionState.actions;
export default selectionState.reducer;