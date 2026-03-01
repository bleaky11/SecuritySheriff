import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameState: "",
    gameOver: Boolean,
    Entity: {name: "", health: 0, type: "Enemy"}
};


const gameOverState = createSlice({
    name: "GameState",
    initialState,
    reducers: {
        finishGame: (state, action) => {
            // when game over => show result screen and options
            state.gameOver = action.payload; // PAYLOAD SHOULD GIVE PROPER GAME STATE VALUE (lose or win)
        }
    }
});


export const {finishGame} = gameOverState.actions;
export default gameOverState.reducer;