import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameStarted: Boolean,
};


const startState = createSlice({
    name: "Start",
    initialState,
    reducers: {
        startGame: (state, action) => {
            // start dialogue, play animations, reload AI output
        }
    }
});


export const {startGame} = startState.actions;
export default startState.reducer;