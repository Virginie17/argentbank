import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';


interface AuthState {
  token: string | null;
  expirationTime: string | null;
  isAuthenticated: boolean;
  user: {
    displayableName: string;
  };
  name: string | null;
}

const initialState: AuthState = {
  token: null,
  expirationTime: null,
  isAuthenticated: false,
  user: {
    displayableName: '',
  },
  name: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; expirationTime: string }>) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.expirationTime = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;