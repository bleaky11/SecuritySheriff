import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    damage: 0,
    Entity: {name: "", health: 0, type: "Alien"}
};

// ASSUME WE SET THE SHERRIF AS THE DEFAULT TARGET (will be set during game)
const shootState = createSlice({
    name: "Shoot",
    initialState,
    reducers: {
        Shoot: (state, action) => {
            const otherEntity = 
            {
                name: action.payload.name,
                health: action.payload.health,
                type: action.payload.type
            };
            if (otherEntity.type === "Cowboy")
            {
                state.Entity.health -= state.damage;
            }
            else
            {
                state.Entity = otherEntity;
                state.Entity.health -= state.damage;
            }
            
        },
        SetDamage: (state, action) => {
            state.damage = action.payload;
        },
        SetShootingTarget: (state, action) => {
            const otherEntity = 
            {
                name: action.payload.name,
                health: action.payload.health,
                type: action.payload.type
            };
            state.Entity = otherEntity;
        }
    }
})

export const { Shoot, SetDamage, SetShootingTarget } = shootState.actions;
export default shootState.reducer;