import Chat from "@/components/Chat";
import { ChatData, ChatType } from "@/components/Chat.types";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [chat, setChat] = useState(new Array<ChatData>());
  const [session, setSession] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    setSession(uuid());
  }, []);
  const handleAskClick = async () => {
    const fetchLex = await fetch(`/api/lex?session=${session}&text=${text}`);
    const lex = await fetchLex.json();
    console.log(lex);

    if (lex.messages) {
      setChat([
        ...chat,
        { id: uuid(), chatType: ChatType.Request, text },
        ...lex.messages.map(
          (message: { content: string; contentType: string }) => ({
            id: uuid(),
            chatType: ChatType.Response,
            text: message.content,
          })
        ),
      ]);
    } else {
      setChat([
        ...chat,
        { id: uuid(), chatType: ChatType.Request, text },
        {
          id: uuid(),
          chatType: ChatType.Response,
          text: lex.sessionState.intent.confirmationState,
        },
      ]);
    }
    setText("");
  };
  const handleDeleteClick = async () => {
    await fetch(`/api/lex?session=${session}`);
    setChat(new Array<ChatData>());
    setSession(uuid());
  };
  return (
    <>
      <h1>Lex Test</h1>
      <h2>
        Session: {session}
        <button onClick={handleDeleteClick}>Delete</button>
      </h2>{" "}
      <input onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={handleAskClick}>Ask</button>
      <Chat chat={chat} />
    </>
  );
}
