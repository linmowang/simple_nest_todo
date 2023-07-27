import { FC, useContext, useEffect, useRef, useState } from "react";
import { Message, MessageData, MessageRole } from "../../types/Chat";
import ClientMessage from "./ClientMessage";
import ServerMessage from "./ServerMessage";
import { Socket, io } from "socket.io-client";
import { wsURL } from "../../contstants";
import AuthContext from "../../context/AuthContext";

interface Props {
  onCancel: () => void;
}

const cTosPattern = "clientToServer";
const sTocPattern = "serverToClient";

const ChatRoom: FC<Props> = (props) => {
  const { onCancel } = props;
  const { token } = useContext(AuthContext);

  const chatRef = useRef<HTMLUListElement | null>(null);
  const socketRef = useRef<Socket>();

  const [newMessage, setNewMessage] = useState("");
  const [msgList, setMsgList] = useState<Message[]>([]);

  const initWs = () => {
    socketRef.current = io(wsURL, {
      path: "/chat/socket.io",
      extraHeaders: {
        authorization: `Bearer ${token}` || "",
      },
    });

    socketRef.current.on("connect", () => {
      console.log("WS 已连接");
      sendMsg("你好");
    });

    socketRef.current.on("exception", (err) => console.log("WS 异常", err));
    socketRef.current.on("disconnect", () => console.log("WS 已断开连接"));
  };

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  const sendMsg = (content: string) => {
    const newMsgList = [
      ...msgList,
      { role: MessageRole.client, createdAt: Date.now(), data: { content } },
    ];

    // setMsgList(newMsgList);
    setNewMessage("");

    if (socketRef.current) {
      socketRef.current?.emit(
        cTosPattern,
        { content },
        (serverData: MessageData) => {
          console.log("服务器消息", serverData);
          setMsgList([
            ...newMsgList,
            {
              role: MessageRole.server,
              createdAt: Date.now(),
              data: { content: serverData.content },
            },
          ]);
        }
      );
    }
  };

  const onServerToClient = (serverData: MessageData) => {
    console.log("服务器消息", serverData);
    setMsgList([
      ...msgList,
      {
        role: MessageRole.server,
        createdAt: Date.now(),
        data: { content: serverData.content },
      },
    ]);
  };

  // 初始化web socket
  useEffect(() => {
    initWs();
    return closeSocket;
  }, []);

  // 绑定web socket事件
  useEffect(() => {
    socketRef.current?.on(sTocPattern, onServerToClient);
    return () => {
      socketRef.current?.off(sTocPattern, onServerToClient);
    };
  }, [msgList]);

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        background: "#fff",
        border: "1px solid #000",
        padding: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>聊天室</h2>
        <span onClick={onCancel}>X</span>
      </header>

      <ul
        ref={chatRef}
        style={{
          width: "400px",
          height: "400px",
          overflow: "auto",
          padding: 0,
          margin: 0,
        }}
      >
        {msgList.map((msg: Message, index) => (
          <>
            {msg.role === MessageRole.client ? (
              <ClientMessage
                content={msg.data.content}
                createdAt={msg.createdAt}
              />
            ) : (
              <ServerMessage
                content={msg.data.content}
                createdAt={msg.createdAt}
              />
            )}
          </>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          style={{
            width: "200px",
            height: "40px",
            lineHeight: "40px",
            paddingLeft: "20px",
          }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMsg(newMessage);
            }
          }}
        />
        <button
          style={{
            width: "100px",
            height: "30px",
            lineHeight: "30px",
            textAlign: "center",
          }}
          onClick={() => sendMsg(newMessage)}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
