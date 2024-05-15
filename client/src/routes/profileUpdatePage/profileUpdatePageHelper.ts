import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import apiRequest, { updateUserUrl } from "../../utils/apiRequest";

export default function useUserUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [avatar, setAvatar] = useState<string[] | string>(
    currentUser?.avatar || ""
  );
  const navigate = useNavigate();

  const changeAvatar = (avatar: string) => {
    setAvatar([avatar]);
  };
  console.log(avatar);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (!currentUser) return;
      const res = await apiRequest.put(await updateUserUrl(currentUser?.id), {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as any;
      setError(errorData.message);
    }
  };

  return { handleSubmit, changeAvatar, currentUser, error, avatar };
}
