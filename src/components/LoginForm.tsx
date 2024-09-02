import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { ILogin }  from '../store/auth';

import InputValidator from '../components/InputValidator';
import Input from '../components/Input';


const LoginForm: React.FC = () => {
  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUser, setIsUser] = useState<boolean>(true);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Récupération des valeurs des champs de saisie
    const formValues = {
      email: enteredUsernameInputRef.current?.value,
      password: enteredPasswordInputRef.current?.value,
      rememberMe: Boolean(rememberMeValueRef.current?.value),
    };

    try {
      // Envoi de la requête de connexion à l'API
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
 // Vérification du statut de la réponse
      if (response.status !== 200) {
        setIsUser(false);// Mise à jour de l'état si l'utilisateur n'est pas valide
        return;
      }

      const data = await response.json(); // Conversion de la réponse en JSON
      const expirationTime = new Date(new Date().getTime() + 86400 * 1000); // Définition de l'expiration du token (1 jour)
      const payload: ILogin = {
        userName: formValues.email!,
        password: formValues.password!,
        rememberMe: rememberMeValueRef.current?.value === 'true',
        token: data.body.token,
        expirationTime: expirationTime.toISOString(),
      };

      setIsUser(true);// Mise à jour de l'état si l'utilisateur est valide
      dispatch(authActions.login(payload));// Dispatch de l'action de connexion
      navigate('/user', { replace: true }); // Navigation vers la page utilisateur
      
    } catch {
      setIsUser(false);
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