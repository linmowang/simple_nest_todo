import { createContext } from "react";

export interface Auth {
  token: string | null;
  setToken: Function;
  login: Function;
  loginOut: Function;
  isAdmin: number;
}

const AuthContext = createContext<Auth>({
  login: async () => {},
  loginOut: async () => {},
  setToken: async () => {},
  token: null,
  isAdmin: 0,
});

export default AuthContext;
