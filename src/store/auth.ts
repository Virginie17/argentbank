import { createSlice, PayloadAction } from "@reduxjs/toolkit";




type SliceState = {
  isAuthenticated: boolean;
  user: {
    token: string | null;
    id: string | null;
    displayableName: string | null;
    email: string | null;
  };
  transactions: {
    id: string | null;
    name: string | null;
    amount: number | null;
  },
};

interface ILogin {
  token: string;
  expirationTime: string;
}

interface IProfile {
  id: string;
  name: string;
  email: string;
}

const initialState: SliceState = {
  isAuthenticated: false,
  user: {
    id: null,
    displayableName: null,
    email: null,
    token: null,
  },
  transactions: {
    id: null,
    name: null,
    amount: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    
    Login(state, action: PayloadAction<ILogin>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("expirationTime", payload.expirationTime);
      state.isAuthenticated = true;
    },
    getProfile(state, action: PayloadAction<IProfile>) {
      const payload = action.payload;
      state.user.id = payload.id;
      state.user.displayableName = payload.name;
      state.user.email = payload.email;
    },
    retrieveStoredToken(state) {
      console.log(state)
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return state;
    },
  },
});

export const authActions = authSlice.actions; 
export default authSlice;
