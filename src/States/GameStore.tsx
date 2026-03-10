import { configureStore } from '@reduxjs/toolkit';
import gameOverStateReducer from './Reducers/endgameSlice.tsx';
import startReducer from './Reducers/startSlice';
import investigateReducer from './Reducers/investigateSlice';
import shootReducer from './Reducers/shootSlice';
import passReducer from './Reducers/passSlice';
import selectionReducer from './Reducers/selectionSlice.tsx';
import settingsReducer from './Reducers/bountyDifficulty.tsx';
import roundReducer from './Reducers/roundSlice.tsx';


const store = configureStore({
  reducer: {
    start: startReducer,
    investigate: investigateReducer,
    shoot: shootReducer,
    pass: passReducer,
    select: selectionReducer,
    settings: settingsReducer,
    endGame: gameOverStateReducer,
    round: roundReducer
  },
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;