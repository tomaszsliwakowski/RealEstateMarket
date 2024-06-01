import { ReactNode, createContext, useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";

export type UserType = {
  id: string;
  email: string;
  username: string;
  avatar?: string | null;
  createdAt: Date;
};

export type UserAuth = {
  currentUser: UserType | null;
  updateUser: Function;
  isLoading: boolean;
};

export const AuthContext = createContext<UserAuth>({
  currentUser: null,
  updateUser: () => {},
  isLoading: true,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateUser = (data: UserType | null) => {
    setCurrentUser(data);
  };

  const updateLaoding = (action: boolean) => {
    setIsLoading(action);
  };
  useEffect(() => {
    const request = async () => {
      await apiRequest
        .get("/auth/logged")
        .then((res) => {
          updateUser(res.data);
          updateLaoding(false);
        })
        .catch(() => {
          updateLaoding(false);
        });
    };
    request();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
