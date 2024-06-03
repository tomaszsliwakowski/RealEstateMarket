import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { AuthContext } from "./authContext";

export const SocketContext = createContext({});

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket<any, any>>();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
