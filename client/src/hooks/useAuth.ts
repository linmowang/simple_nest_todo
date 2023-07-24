import { useState } from "react";

import http from "../http";
import { Auth } from "../context/AuthContext";

const useAuth = (): Auth => {
  const [token, setToken] = useState(() => {
    // 缓存
    const cacheToken = localStorage.getItem("token") || null;
    const cacheTokenExpire = Number(localStorage.getItem("token_expire") || 0);

    const isExpired = Date.now() - cacheTokenExpire >= 0;
    return isExpired ? null : cacheToken;
  });

  const [isAdmin, setIsAdmin] = useState(
    Number(localStorage.getItem("is_admin"))
  );

  const login = async (data: any) => {
    const response = await http.post("/auth/login", data);

    const { token, user, expiresIn } = response.data;
    const tokenExpiredTime = Date.now() + expiresIn * 60 * 1000;

    // 本地存储
    localStorage.setItem("token", token);
    localStorage.setItem("token_expire", tokenExpiredTime.toString());
    localStorage.setItem("is_admin", user.is_admin);

    setToken(token);
    setIsAdmin(user.is_admin);
  };

  const loginOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");
    localStorage.removeItem("is_admin");
    setToken(null);
    setIsAdmin(0);
  };

  return { token, setToken, login, loginOut, isAdmin };
};

export default useAuth;
