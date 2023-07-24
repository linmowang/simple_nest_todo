import React, { FC, useEffect, useState } from "react";
import http from "../../http";

const Todo: FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const data = await http.get("/todo");
    setLoading(false);
  };

  return <div>{loading ? <div>loading</div> : <h1>todo</h1>}</div>;
};

export default Todo;
