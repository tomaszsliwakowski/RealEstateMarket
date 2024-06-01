import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../utils/apiRequest";

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  const closeChat = (action: null) => {
    setChat(action);
  };

  return { chat, currentUser, handleOpenChat, closeChat, handleSubmit };
}
