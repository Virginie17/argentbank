import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SliceState, ILogin, IProfile } from "../types/user.type";

// Définition de l'état initial du slice auth
const initialState: SliceState = {
  isAuthenticated: false, // Indique si l'utilisateur est authentifié
  user: {
    token: null, 
    id: null, 
    displayableName: null, 
    email: null, 
    firstName: null, 
    lastName: null 
  },
};

// Création du slice auth avec Redux Toolkit
const authSlice = createSlice({
  name: "auth", 
  initialState, 
  reducers: {
    // Action pour connecter l'utilisateur
    login(state, action: PayloadAction<ILogin>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token); // Stocke le jeton dans le localStorage
      localStorage.setItem("expirationTime", payload.expirationTime); // Stocke le temps d'expiration dans le localStorage
      state.isAuthenticated = true; // Met à jour l'état d'authentification
      state.user.token = payload.token; // Assure que le jeton est stocké dans l'état
    },
    // Action pour récupérer le profil de l'utilisateur
    getProfile(state, action: PayloadAction<IProfile>) {
      const payload = action.payload;
      state.user = state.user || {}; // Assure que l'objet user existe
      state.user.id = payload.id; // Met à jour l'identifiant de l'utilisateur
      state.user.displayableName = payload.userName; // Met à jour le nom affichable de l'utilisateur
      state.user.email = payload.email; // Met à jour l'email de l'utilisateur
      state.user.firstName = payload.firstName; // Met à jour le prénom de l'utilisateur
      state.user.lastName = payload.lastName; // Met à jour le nom de famille de l'utilisateur
    },
    // Action pour récupérer le jeton stocké
    retrieveStoredToken(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true; // Met à jour l'état d'authentification
        state.user.token = token; // Assure que le jeton est stocké dans l'état
      }
    },
    // Action pour déconnecter l'utilisateur
    logout() {
      localStorage.removeItem("token"); // Supprime le jeton du localStorage
      localStorage.removeItem("expirationTime"); // Supprime le temps d'expiration du localStorage
      return initialState; // Réinitialise l'état à l'état initial
    },
    // Action pour mettre à jour le nom affichable de l'utilisateur
    setUserName(state, action: PayloadAction<string>) {
      state.user.displayableName = action.payload; // Met à jour le nom affichable de l'utilisateur
    },
    // Fonction updateUser qui met à jour l'état utilisateur dans le store Redux
updateUser(state, action: PayloadAction<SliceState>) {
  // Met à jour la propriété 'user' de l'état avec la valeur de 'user' dans le payload de l'action
  state.user = action.payload.user;
},
  },
});


export const authActions = authSlice.actions;

export default authSlice;