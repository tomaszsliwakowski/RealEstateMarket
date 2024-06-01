import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function useLogout() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return { handleLogout, currentUser };
}
