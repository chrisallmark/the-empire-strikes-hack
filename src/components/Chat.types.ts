export interface ChatProps {
  chat: Array<ChatData>;
}

export interface ChatData {
  id: string;
  chatType: ChatType;
  text: string;
}

export enum ChatType {
  Request,
  Response,
}
