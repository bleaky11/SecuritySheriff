import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    damage: 0,
    Entity: {name: "", health: 0, type: "Enemy"}
};


const shootState = createSlice({
    name: "Shoot",
    initialState,
    reducers: {
        Shoot: (state, action) => {
            const otherEntity = 
            {
                name: action.payload.name,
                health: (action.payload.health - state.damage),
                type: action.payload.type
            };
            state.Entity = otherEntity;
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