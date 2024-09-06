import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SliceState, ILogin, IProfile } from "../types/user.type";

const initialState: SliceState = {
  isAuthenticated: false,
  user: {
    token: null,
    id: null,
    displayableName: null,
    email: null,
    firstName: null,
    lastName: null
  },
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILogin>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("expirationTime", payload.expirationTime);
      state.isAuthenticated = true;
      state.user.token = payload.token; // Ensure the token is stored in the state
    },
    getProfile(state, action: PayloadAction<IProfile>) {
      const payload = action.payload;
      state.user = state.user || {};
      state.user.id = payload.id;
      state.user.displayableName = payload.userName;
      state.user.email = payload.email;
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
      
    },
    retrieveStoredToken(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true;
        state.user.token = token; // Ensure the token is stored in the state
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return initialState;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user.displayableName = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;