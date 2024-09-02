import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition du type pour l'état du slice
type SliceState = {
  isAuthenticated: boolean; 
  user: {
    id: string | null; 
    displayableName: string | null; 
    email: string | null; 
  };
};

// Interface pour les informations de connexion
export interface ILogin {
  token: string; 
  expirationTime: string; 
  userName: string; 
  password: string; 
  rememberMe: boolean; 
}

// Interface pour le profil de l'utilisateur
interface IProfile {
  id: string; 
  userName: string; 
  email: string; 
}

// État initial du slice
const initialState: SliceState = {
  isAuthenticated: false, // Par défaut, l'utilisateur n'est pas authentifié
  user: {
    id: null,
    displayableName: null,
    email: null,
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