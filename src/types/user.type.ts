
export interface IUser {
  token: string | null;
  id: string | null;
  displayableName: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface SliceState {
  isAuthenticated: boolean;
  user: IUser;
}

export interface ILogin {
  token: string;
  expirationTime: string;
  userName: string;
  password: string;
  rememberMe: boolean;
}

export interface IProfile {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
}