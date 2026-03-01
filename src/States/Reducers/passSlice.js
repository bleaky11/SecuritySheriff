import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    started: Boolean,
};


const passState = createSlice({
    name: "Pass",
    initialState,
    reducers: {
        passEnemy: (state, action) => {
            // Order => Check if enemy was fake, swap sprite/asset (if applied), remove hp (if applied), play leave anim/dialogue, 
            // remove and replace current enemy from queue
        }
    }
});


export const {passEnemy} = passState.actions;
export default passState.reducers;