import { ChangeEvent, FC, useEffect, useState } from "react";
import { FormType, Todo, TodoStatus } from "../../../types/Todo";
import http from "../../../http";

interface Props {
  onSubmit: (todo: Partial<Todo>) => Promise<void>;
  todo?: Todo;
}

const defaultTodo: Omit<Todo, "id"> = {
  title: "",
  description: "",
  media: "",
  status: TodoStatus.TODO,
};

const TodoForm: FC<Props> = (props) => {
  const { todo, onSubmit } = props;
  const [newTodo, setNewTodo] =
    useState<Omit<Todo, "id" | "status">>(defaultTodo);

  useEffect(() => {
    setNewTodo(todo || defaultTodo);
    console.log(todo);
  }, [todo]);

  const onUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.set("file", e.target.files[0]);
    const response = await http.post("/upload/file", formData);
    setNewTodo({ ...newTodo, media: response.data.file });
  };

  return (
    <div className="todo-form">
      <div>
        <input
          value={newTodo.title}
          type="text"
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="输入标题"
        />
      </div>
      <div>
        <textarea
          value={newTodo.description}
          cols={30}
          rows={10}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          placeholder="输入内容"
        />
      </div>
      <div>
        <input accept="image/*" onChange={onUploadChange} type="file" />
      </div>
      {newTodo.media && (
        <div>
          <img width={200} src={newTodo.media} />
        </div>
      )}
      <div>
        <button onClick={() => onSubmit(newTodo)}>提交</button>
      </div>
    </div>
  );
};

export default TodoForm;
