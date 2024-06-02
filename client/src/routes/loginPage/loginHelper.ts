import { useContext, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function useLogin() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username !== "string" || typeof password !== "string") return;

    try {
      const res = await apiRequest.post("/auth/login", { username, password });
      updateUser(res.data);
      navigate("/");
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorData = error.response?.data as any;
      setError(errorData.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, handleSubmit };
}
