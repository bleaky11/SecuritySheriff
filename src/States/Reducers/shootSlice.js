import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: Boolean,
    damage: Number,
    Entity: {name: "", health: 0 }
};


const shootState = createSlice({
    name: "Shoot",
    initialState,
    reducers: {
        Shoot: (state, action) => {
            
        }
    }
})