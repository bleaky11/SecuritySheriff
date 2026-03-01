import { createSlice } from "@reduxjs/toolkit";

type Difficulty = "Easy" | "Medium" | "Hard" | "Very Hard" | "Extreme";
type Bounty = "Script" | "Email";
type Language = "SQL" | "Python" | "Java" | "C" | "C++" | "Typescript";


interface gameSettings {
    difficulty: Difficulty,
    bounty: Bounty,
    language: Language
}

const initialState = {
    settings: {difficulty: "Easy", bounty: "Email", language: "SQL"}
};

const settingsState = createSlice({
    name: "settings",
    initialState,
    reducers: {
        SelectDifficulty: (state, action) =>
        {
            state.settings.difficulty = action.payload.difficulty;
        },
        SelectBounty: (state, action) =>
        {
            state.settings.bounty = action.payload.bounty;
        },
        SelectLanguage: (state, action) =>
        {
            state.settings.language = action.payload.language;
        }
    }
});


export const {SelectDifficulty, SelectBounty, SelectLanguage} = settingsState.actions;
export default settingsState.reducer;

