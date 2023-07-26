export enum TodoStatus {
  TODO = 0,
  DONE = 1,
}

export enum FormType {
  add = "add",
  update = "update",
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  media?: string;
  status: TodoStatus;
}
