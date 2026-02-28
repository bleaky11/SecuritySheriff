import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
    },
});

// helpful types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;