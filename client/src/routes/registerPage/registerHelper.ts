import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
      return;
    try {
      await apiRequest.post("/auth/register", { username, email, password });
      navigate("/login");
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
