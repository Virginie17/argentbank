import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type SliceState = {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    displayableName: string | null;
    email: string | null;
  };
};

export interface ILogin {
  token: string;
  expirationTime: string;
  userName: string;
  password: string;
  rememberMe: boolean;
 
}

interface IProfile {
  id: string;
  userName: string;
  email: string;
}

const initialState: SliceState = {
  isAuthenticated: false,
  user: {
    id: null,
    displayableName: null,
    email: null,
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
    },
    getProfile(state, action: PayloadAction<IProfile>) {
      const payload = action.payload;
      state.user.id = payload.id;
      state.user.displayableName = payload.userName;
      state.user.email = payload.email;

    },
    retrieveStoredToken(state) {
      state.isAuthenticated = true;
    },
        logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return ( initialState);
    },
  },
});


export const authActions = authSlice.actions;
export default authSlice;