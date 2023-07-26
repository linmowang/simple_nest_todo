import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import http from "../../http";

const Login: FC = () => {
  const navigate = useNavigate();
  const [authForm, setAuthForm] = useState({
    username: "linmowang",
    password: "jie355116",
  });
  const [msg, setMsg] = useState("");
  const auth = useContext(AuthContext);
  const login = async () => {
    const isLogin = await auth.login({ ...authForm });
    if (isLogin) {
      setMsg("登录成功");
      navigate("/");
    } else {
      setMsg("登录失败");
    }
  };

  // const getProfile = async () => {
  //   const result = await http.get("/auth/profile");
  //   console.log(result);
  // };

  return (
    <div>
      <h1>登录页</h1>

      {/* <button onClick={getProfile}>测试profile</button> */}

      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username">
            用户名:
            <input
              style={{ marginLeft: "20px" }}
              value={authForm.username}
              onChange={(e) =>
                setAuthForm({ ...authForm, username: e.target.value })
              }
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username">
            密码:
            <input
              style={{ marginLeft: "20px" }}
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />
          </label>
        </div>

        <button onClick={login}>登录</button>
      </div>
    </div>
  );
};

export default Login;
