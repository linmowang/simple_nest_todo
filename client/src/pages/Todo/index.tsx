import React, { FC, useContext, useEffect, useState } from "react";
import http from "../../http";
import AuthContext from "../../context/AuthContext";
import { Todo, FormType } from "../../types/Todo";
import { Link, useNavigate } from "react-router-dom";
import TodoForm from "./TodoForm";

const TodoELement: FC = () => {
  const auth = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formType, setFormType] = useState<FormType | undefined>(undefined);
  const [selectTodo, setSelectTodo] = useState<Todo | undefined>();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const { data } = await http.get("/todo");
    setTodos(data);
    setLoading(false);
  };

  const addNewTodo = async () => {
    setFormType(FormType.add);
    setSelectTodo(undefined);
  };

  const submitTodo = async (newTodo: Partial<Todo>) => {
    setLoading(true);
    if (formType === FormType.add) {
      await http.post("/todo", newTodo);
    } else {
      await http.patch(`/todo/${newTodo.id}`, newTodo);
    }

    setFormType(undefined);
    setSelectTodo(undefined);
    setLoading(false);
    await fetchTodos();
  };

  const onEditTodo = (item: Todo) => {
    setFormType(FormType.update);
    setSelectTodo(item);
  };

  const onDeleteTodo = async (item: Todo) => {
    await http.delete(`/todo/${item.id}`);
    await fetchTodos();
  };

  return (
    <div>
      {loading && <div>loading</div>}
      {auth.isAdmin && (
        <header style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Link to="/admin">管理员页面</Link>
        </header>
      )}
      <div>
        {user && (
          <p>
            welcome! 当前用户{user.username}{" "}
            <button
              onClick={() => {
                auth.loginOut();
                navigate("/login");
              }}
            >
              退出登录
            </button>{" "}
          </p>
        )}

        {/* 新增待办 */}
        <div>
          <button onClick={addNewTodo}>新增待办事项</button>
        </div>
        {(formType === FormType.add || selectTodo) && (
          <div>
            <TodoForm todo={selectTodo} onSubmit={submitTodo} />
          </div>
        )}

        <ul>
          {todos.map((item: Todo) => (
            <li key={item.id}>
              <p>标题{item.title}</p>
              {item.media && (
                <div>
                  <img src={item.media} width={200} />
                </div>
              )}
              <p>具体内容: {item.description}</p>
              <div>
                <button onClick={() => onEditTodo(item)}>编辑</button>
                <button onClick={() => onDeleteTodo(item)}>移除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoELement;
