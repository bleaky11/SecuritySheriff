import { configureStore } from '@reduxjs/toolkit';
import { gameOverReducer } from './Reducers/endgameSlice';


const store = configureStore({
  reducer: {
    start: startReducer,
    investigate: investigateReducer,
    shoot: shootReducer,
    pass: passReducer,
    endGame: gameOverReducer

  },
});



export default store;