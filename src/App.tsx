import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import { authActions } from "./store/auth";
import { RootState } from "./store/index";


const App: React.FC = () => {
  const token = localStorage.getItem("token"); // Récupération du token depuis le localStorage
  const dispatch = useDispatch(); // Hook pour dispatcher des actions Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  ); // Sélection de l'état d'authentification depuis le store Redux

  // Effet pour vérifier le token à chaque rendu du composant
  useEffect(() => {
    if (!token) return; // Si pas de token, on ne fait rien

    // Fonction pour vérifier la validité du token
    const tokenCheckerHandler: () => void = () => {
      const nowTime: number = new Date().getTime(); 
      const storedExpirationTime: string | null =
        localStorage.getItem("expirationTime"); // Récupération de la date d'expiration du token

      if (storedExpirationTime !== null) {
        const expirationDate: number = new Date(storedExpirationTime).getTime(); 
        if (nowTime > expirationDate) {
          dispatch(authActions.logout()); // Si le token est expiré, déconnexion
        } else {
          dispatch(authActions.retrieveStoredToken()); // Sinon, récupération du token stocké
        }
      }
    };

    tokenCheckerHandler(); // Appel de la fonction de vérification du token
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Route pour la page d'accueil, accessible à tous */}
        <Route path="/" element={<Home />} />
        {/* Route pour la page de connexion */}
        {!isAuthenticated ? (
          <Route path="/sign-in" element={<Login />} />
        ) : (
          <Route path="/user" element={<User />} />
        )}
        {/* Route pour la page utilisateur, accessible uniquement si authentifié */}
        {isAuthenticated && <Route path="/user" element={<User />} />}
        {/* Redirection vers la page utilisateur si authentifié, sinon vers la page de connexion */}
        {isAuthenticated ? (
          <Route path="*" element={<Navigate to="/user" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;