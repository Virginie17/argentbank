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
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!token) return;
    const tokenCheckerHandler: () => void = () => {
      const nowTime: number = new Date().getTime();
      const storedExpirationTime: string | null =
        localStorage.getItem("expirationTime");

      if (storedExpirationTime !== null) {
        const expirationDate: number = new Date(storedExpirationTime).getTime();
        if (nowTime > expirationDate) {
          dispatch(authActions.logout());
        } else dispatch(authActions.retrieveStoredToken());
      }
    };
    tokenCheckerHandler();
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!isAuthenticated && <Route path="/" element={<Home />} />}
        {!isAuthenticated ? (
          <Route path="/sign-in" element={<Login />} />
        ) : (
          <Route path="/user" element={<User />} />
        )}
        {isAuthenticated && <Route path="/user" element={<User />} />}
        {isAuthenticated && (
          <Route path="*" element={<Navigate to="/user" replace />} />
        )}
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;