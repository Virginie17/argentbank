import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { ILogin, IProfile } from '../types/user.type';
import InputValidator from '../components/InputValidator';
import Input from '../components/Input';
import { fetchUser } from '../services/UserService';

const LoginForm: React.FC = () => {
  // Références pour les champs de saisie
  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate(); // Hook pour la navigation
  const dispatch = useDispatch(); // Hook pour dispatcher des actions Redux

  const [isUser, setIsUser] = useState<boolean>(true); // État pour vérifier si l'utilisateur est valide

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs du formulaire
    const formValues = {
      email: enteredUsernameInputRef.current?.value,
      password: enteredPasswordInputRef.current?.value,
      rememberMe: Boolean(rememberMeValueRef.current?.value),
    };

    try {
      // Envoi de la requête de connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.status !== 200) {
        setIsUser(false); // Si la réponse n'est pas OK, l'utilisateur n'est pas valide
        return;
      }

      const data = await response.json();
      const expirationTime = new Date(new Date().getTime() + 86400 * 1000); // Calcul du temps d'expiration du token
      const payload: ILogin = {
        token: data.body.token,
        expirationTime: expirationTime.toISOString(),
        userName: formValues.email!,
        password: formValues.password!,
        rememberMe: rememberMeValueRef.current?.value === 'true',
      };

      setIsUser(true); // L'utilisateur est valide
      dispatch(authActions.login(payload)); // Dispatch de l'action de connexion

      // Récupération des données de profil de l'utilisateur
      const userData: IProfile = await fetchUser(data.body.token);
      dispatch(
        authActions.getProfile({
          id: userData.id,
          email: userData.email,
          userName: userData.userName,
          firstName: userData.firstName,
          lastName: userData.lastName,
        })
      );

      navigate('/user', { replace: true }); // Navigation vers la page utilisateur
      
    } catch {
      setIsUser(false); // En cas d'erreur, l'utilisateur n'est pas valide
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputValidator className="input-wrapper">
        <label htmlFor="username">Username</label>
        <Input id="username" ref={enteredUsernameInputRef} />
      </InputValidator>
      <InputValidator className="input-wrapper">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" ref={enteredPasswordInputRef} />
      </InputValidator>
      <InputValidator className="input-remember">
        <Input id="remember-me" type="checkbox" ref={rememberMeValueRef} />
        <label htmlFor="remember-me">Remember me</label>
      </InputValidator>
      <button className="sign-in-button">Sign In</button>

      {!isUser && (
        <p className="login-error">Wrong email/password combination</p>
      )}
    </form>
  );
};

export default LoginForm;