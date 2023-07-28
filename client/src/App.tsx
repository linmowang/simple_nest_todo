import React, { FC, useState, useEffect } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  // Route,
} from "react-router-dom";
import "./App.css";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import useAuth from "./hooks/useAuth";
import AuthContext from "./context/AuthContext";
import http from "./http";
import { CountData } from "./types/CountData";
import ChatRoom from "./components/ChatRoom";

const App: FC = () => {
  const auth = useAuth();
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState("");
  const [chatVisible, setChatVisible] = useState(false);

  const fetchCount = async () => {
    await http.post("/count");
    const { data } = await http.get<CountData>("/count");
    setCount(data.count);
  };

  const fetchQuote = async () => {
    const { data } = await http.get("/quote");
    setQuote(`${data.content} -- ${data.author}`);
  };

  useEffect(() => {
    fetchCount();
    fetchQuote();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todo />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return (
    <AuthContext.Provider value={auth}>
      <header>
        <div>访问量：{count}</div>
        {quote && <p>今日名言：{quote}</p>}
      </header>

      <RouterProvider router={router} />

      {!chatVisible && auth.token && (
        <button
          onClick={() => setChatVisible(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            fontSize: "1.2em",
          }}
        >
          我要聊天
        </button>
      )}
      {chatVisible && auth.token && (
        <ChatRoom onCancel={() => setChatVisible(false)} />
      )}
    </AuthContext.Provider>
  );
};

export default App;
