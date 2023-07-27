export enum MessageRole {
  client = 1,
  server = 2,
}

export interface MessageData {
  content: string;
}

export interface Message {
  role: MessageRole;
  data: MessageData;
  createdAt: number;
}
