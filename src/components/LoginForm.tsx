import React, { useRef } from 'react';
import Input from './Input';
import InputValidator from './InputValidator';

const LoginForm: React.FC = () => {
  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeValueRef = useRef<HTMLInputElement>(null);

  
  const isUser = true;
  
  return (
    <form>
      <InputValidator className="input-wrapper">
        <label htmlFor="username">Username</label>
        <Input id="username" ref={enteredUsernameInputRef} />
      </InputValidator>
      <InputValidator className="input-wrapper">
        <label htmlFor="password">Password</label>
        <Input id="password" ref={enteredPasswordInputRef} />
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