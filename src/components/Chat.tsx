import { ChatProps, ChatType } from "./Chat.types";

const Chat = ({ chat }: ChatProps) => {
  return (
    <div>
      {chat.map((chatData) => (
        <div
          style={{
            fontWeight:
              chatData.chatType === ChatType.Request ? "bold" : "normal",
            padding: "4px",
          }}
          key={chatData.id}
        >
          {chatData.text}
        </div>
      ))}
    </div>
  );
};

export default Chat;
