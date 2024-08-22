import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

import InputValidator from "./InputValidator";
import Input from "./Input";

const LoginForm: React.FC = () => {
  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeValueRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUser, setIsUser] = useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      email: enteredUsernameInputRef.current?.value,
      password: enteredPasswordInputRef.current?.value,
    };

    try {
      fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        
      .then(async (res) => {
        if (res.status !== 200) return;
      
        const responseJson = await res.json();
        const expirationTime = new Date(new Date().getTime() + 86400 * 1000); //1day valid token
        const payload = {
          token: responseJson.body.token,
          expirationTime: expirationTime.toISOString(),
        };
      
        setIsUser(true);
          dispatch(authActions.login(payload));
          navigate("/user", { replace: true });
        })
        .catch(() => setIsUser(false));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputValidator className="input-wrapper wrappers">
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