import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SliceState, ILogin, IProfile } from "../types/user.type";


// État initial du slice
const initialState: SliceState = {
  isAuthenticated: false, // Par défaut, l'utilisateur n'est pas authentifié
  user: {
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
    // Action pour la connexion
    login(state, action: PayloadAction<ILogin>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token); // Stockage du token dans le localStorage
      localStorage.setItem("expirationTime", payload.expirationTime); // Stockage de la date d'expiration dans le localStorage
      state.isAuthenticated = true; // Mise à jour de l'état d'authentification
    },
    // Action pour récupérer le profil de l'utilisateur
    getProfile(state, action: PayloadAction<IProfile>) {
      const payload = action.payload;
      state.user.id = payload.id; 
      state.user.displayableName = payload.userName; 
      state.user.email = payload.email; 
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
    },
    // Action pour récupérer le token stocké
    retrieveStoredToken(state) {
      state.isAuthenticated = true; 
    },
    // Action pour la déconnexion
    logout() {
      localStorage.removeItem("token"); // Suppression du token du localStorage
      localStorage.removeItem("expirationTime"); // Suppression de la date d'expiration du localStorage
      return initialState; // Réinitialisation de l'état
    },
    // Action pour mettre à jour le nom d'utilisateur
    setUserName(state, action: PayloadAction<string>) {
      state.user.displayableName = action.payload; // Mise à jour du nom affichable de l'utilisateur
    },
  },
});


export const authActions = authSlice.actions;
export default authSlice;