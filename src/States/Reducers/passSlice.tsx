import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Entity: {name: "", health: 0, type: "Enemy"}
};

// ASSUME WE SET THE SHERRIF AS THE DEFAULT TARGET (will be set during game)
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
            if (otherEntity.type === "Cowboy")
            {
                // If we are default target we should not take damage
                // may need to call other functions here
            }
            else {
                state.Entity.health -= 4; // arbitrary value, I forgot there is no damage here
                state.Entity = otherEntity;
            }
            
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