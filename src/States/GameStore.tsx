import { configureStore } from '@reduxjs/toolkit';
import gameOverStateReducer from './Reducers/endgameSlice.tsx';
import startReducer from './Reducers/startSlice';
import investigateReducer from './Reducers/investigateSlice';
import shootReducer from './Reducers/shootSlice';
import passReducer from './Reducers/passSlice';


const store = configureStore({
  reducer: {
    start: startReducer,
    investigate: investigateReducer,
    shoot: shootReducer,
    pass: passReducer,
    endGame: gameOverStateReducer
  },
});



export default store;