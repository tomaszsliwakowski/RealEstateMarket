import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../utils/apiRequest";
import { AxiosError } from "axios";

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

  const handleOpenChat = async (
    id: string,
    receiver: ReceiverType | undefined
  ) => {
    try {
      const res = await apiRequest("/chats/" + id);
      console.log(res);
      setChat({ ...res.data, receiver });
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorData = error.response?.data as any;
      console.log(errorData);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text");
    if (!text || text === "") return;
    try {
      const res = await apiRequest.post("/messages/" + chat?.id, { text });
      setChat((prev) =>
        prev ? { ...prev, messages: [...prev?.messages, res.data] } : null
      );
      e.currentTarget.reset();
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorData = error.response?.data as any;
      console.log(errorData);
    }
  };

  const closeChat = (action: null) => {
    setChat(action);
  };

  return { chat, currentUser, handleOpenChat, closeChat, handleSubmit };
}
