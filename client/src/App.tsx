import React, { FC, useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import "./App.css";
import Todo from "./pages/Todo";
import Login from "./pages/Login";

import useAuth from "./hooks/useAuth";
import AuthContext from "./context/AuthContext";

const App: FC = () => {
  const auth = useAuth();
  console.log("auth:", auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todo />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AuthContext.Provider value={auth}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
