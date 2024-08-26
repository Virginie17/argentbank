import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

import InputValidator from '../components/InputValidator';
import Input from '../components/Input';

interface ILogin {
  email: string;
  password: string;
  token: string;
  expirationTime: string;
  username?: string;
  rememberMe?: boolean;
}

const LoginForm: React.FC = () => {
  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUser, setIsUser] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      email: enteredUsernameInputRef.current?.value,
      password: enteredPasswordInputRef.current?.value,
      rememberMe: Boolean(rememberMeValueRef.current?.value),
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
      const expirationTime = new Date(new Date().getTime() + 86400 * 1000); // 1 day valid token
      const payload: ILogin = {
        username: formValues.email!,
        password: formValues.password!,
        rememberMe: rememberMeValueRef.current?.value,
        token: data.body.token,
        expirationTime: expirationTime.toISOString(),
      };

      setIsUser(true);
      dispatch(authActions.Login(payload));
      navigate('/user', { replace: true });
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