import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    roundStarted: false,
    roundCount: 0
};



const roundState = createSlice({
    name: "Round",
    initialState,
    reducers: {
        startRound: (state, action) => {
            state.roundStarted = action.payload;
        },
        incrementRound: (state) => {
            state.roundCount += 1;
        },
        resetRound: (state) => {
            state.roundCount = 0;
        }
    }
});


export const {startRound, incrementRound, resetRound} = roundState.actions;
export default roundState.reducer;