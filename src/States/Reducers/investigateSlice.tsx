import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    started: Boolean,
    Entity: {name: "", health: 0, type: "Enemy"}
};



const investigationState = createSlice({
    name: "Investigation",
    initialState,
    reducers: {
        startInvestigate: (state, action) => {
            // should make all of the buttons available on screen
            state.started = action.payload;
        },
        setInvesTarget: (state, action) => {
            const otherEntity = {
                name: action.payload.name,
                health: action.payload.health,
                type: action.payload.type
            }
            state.Entity = otherEntity;
        }
    }
});


export const { startInvestigate, setInvesTarget } = investigationState.actions;
export default investigationState.reducer;