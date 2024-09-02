
// Définition du type pour l'état du slice
export type SliceState = {
    isAuthenticated: boolean; 
    user: {
      id: string | null; 
      displayableName: string | null; 
      email: string | null; 
      firstName: string | null; 
      lastName: string | null; 
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
  export interface IProfile {
    id: string; 
    userName: string; 
    firstName: string; 
    lastName: string; 
    email: string; 
  }