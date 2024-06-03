import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../utils/apiRequest";
import { AxiosError } from "axios";
import { SocketContext } from "../../context/socketContext";

type ReceiverType = {
  id: string;
  username: string;
  avatar: string;
};
type MessageType = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: Date;
};

type ChatType = {
  id: string;
  userIDs: string[];
  createdAt: Date;
  seenBy: string[];
  lastMessage: string;
  receiver?: ReceiverType;
  messages: MessageType[];
};

export default function useChats() {
  const [chat, setChat] = useState<ChatType | null>(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext) as any;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleOpenChat = async (
    id: string,
    receiver: ReceiverType | undefined
  ) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, receiver });
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorData = error.response?.data as string;
      console.log(errorData);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text");
    if (!text || text === "" || !chat) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) =>
        prev ? { ...prev, messages: [...prev?.messages, res.data] } : null
      );
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorData = error.response?.data as string;
      console.log(errorData);
    }
  };

  const closeChat = (action: null) => {
    setChat(action);
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat?.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data: MessageType) => {
        if (chat.id === data.chatId) {
          setChat((prev) =>
            prev ? { ...prev, messages: [...prev.messages, data] } : null
          );
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return {
    chat,
    currentUser,
    handleOpenChat,
    closeChat,
    handleSubmit,
    inputRef,
  };
}
