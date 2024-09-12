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
    // Action pour connecter l'utilisateur
    login(state, action: PayloadAction<ILogin>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token); 
      localStorage.setItem("expirationTime", payload.expirationTime); 
      state.isAuthenticated = true; 
      state.user.token = payload.token; 
    },
    // Action pour récupérer le profil de l'utilisateur
    getProfile(state, action: PayloadAction<IProfile>) {
      const payload = action.payload;
      state.user = state.user || {}; 
      state.user.id = payload.id; 
      state.user.displayableName = payload.userName; 
      state.user.email = payload.email; 
      state.user.firstName = payload.firstName; 
      state.user.lastName = payload.lastName; 
    },
    // Action pour récupérer le jeton stocké
    retrieveStoredToken(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true; 
        state.user.token = token; 
      }
    },
    // Action pour déconnecter l'utilisateur
    logout() {
      localStorage.removeItem("token"); 
      localStorage.removeItem("expirationTime"); 
      return initialState; 
    },
    // Action pour mettre à jour le nom affichable de l'utilisateur
    setUserName(state, action: PayloadAction<string>) {
      state.user.displayableName = action.payload; 
    },
    // Fonction updateUser qui met à jour l'état utilisateur dans le store Redux
updateUser(state, action: PayloadAction<SliceState>) {
  state.user = action.payload.user;
},
  },
});


export const authActions = authSlice.actions;

export default authSlice;