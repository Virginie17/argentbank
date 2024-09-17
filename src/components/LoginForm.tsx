import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { ILogin, IProfile } from '../types/user.type';
import InputValidator from '../components/InputValidator';
import Input from '../components/Input';
import { fetchUser } from '../services/userService';

const LoginForm: React.FC = () => {
  // Références pour les champs de saisie
  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const [isUser, setIsUser] = useState<boolean>(true); 
  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    // Récupération des valeurs du formulaire
    const formValues = {
      email: enteredUsernameInputRef.current?.value,
      password: enteredPasswordInputRef.current?.value,
      rememberMe: rememberMeValueRef.current?.checked,
    };

    try {
      
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.status !== 200) {
        setIsUser(false); 
        return;
      }

      const data = await response.json();
      const expirationTime = new Date(new Date().getTime() + 86400 * 1000); 
      const payload: ILogin = {
        token: data.body.token,
        expirationTime: expirationTime.toISOString(),
        userName: formValues.email!,
        password: formValues.password!,
        rememberMe: formValues.rememberMe!
      };

      setIsUser(true); 
      dispatch(authActions.login(payload)); 
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
// Stocker le jeton en fonction de "Remember Me"
if (formValues.rememberMe) {
  localStorage.setItem('token', data.body.token);
} else {
  sessionStorage.setItem('token', data.body.token);
      navigate('/user', { replace: true }); 
    }
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