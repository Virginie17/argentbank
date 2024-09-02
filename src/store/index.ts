import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";

// Configuration du store Redux
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// Définition du type RootState pour représenter l'état global du store
export type RootState = ReturnType<typeof store.getState>;
export default store;