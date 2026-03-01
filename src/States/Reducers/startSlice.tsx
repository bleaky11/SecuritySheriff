import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    gameStarted: false
    
};



const startState = createSlice({
    name: "Start",
    initialState,
    reducers: {
        startGame: (state, action) => {
            // start dialogue, play animations, reload AI output
            state.gameStarted = action.payload;
            console.log("Start game has been called!");
        }
    }
});


export const {startGame} = startState.actions;
export default startState.reducer;