import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { FC } from 'react';




type SetState = typeof useState;
type AuthAction = {
  type: string;
};

interface LoginFormProps {
  state: boolean;
  setState: SetState;
  dispatch: React.Dispatch<AuthAction>;
}

const SigninForm: FC<LoginFormProps> = () => {
  const dispatch = useDispatch();

  const enteredUsernameInputRef = useRef<HTMLInputElement>(null);
  const enteredPasswordInputRef = useRef<HTMLInputElement>(null);
  const [isUser, setIsUser] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      email: enteredUsernameInputRef.current?.value,
      password: enteredPasswordInputRef.current?.value,
    };

    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/login", formValues);
      if (res.status !== 200) return;

      const expirationTime = new Date(new Date().getTime() + 86400 * 1000); // 1 day valid token
      const payload = {
        token: res.data.body.token,
        expirationTime: expirationTime.toISOString(),
      };

      dispatch(authActions.login(payload));
      setIsUser(true);
    } catch (error) {
      console.error("Error logging in:", error);
      setIsUser(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={enteredUsernameInputRef} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={enteredPasswordInputRef} />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">Sign In</button>
      {!isUser && <p className="error-message">Invalid username or password</p>}
    </form>
  );
};

export default SigninForm;