import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    started: Boolean,
    Entity: {name: "", health: 0, type: "Enemy"}
};


const passState = createSlice({
    name: "Pass",
    initialState,
    reducers: {
        passEnemy: (state, action) => {
            // Order => Check if enemy was fake, swap sprite/asset (if applied), remove hp (if applied), play leave anim/dialogue, 
            // remove and replace current enemy from queue
            const otherEntity = {
                name: action.payload.name,
                health: action.payload.health,
                type: action.payload.type
            };
            state.Entity = otherEntity;
        },
        SetPassTarget: (state, action) => {
            const otherEntity = 
            {
                name: action.payload.name,
                health: action.payload.health,
                type: action.payload.type
            };
            state.Entity = otherEntity;
        }
    }
});


export const { passEnemy, SetPassTarget } = passState.actions;
export default passState.reducer;