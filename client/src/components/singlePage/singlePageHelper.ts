import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

export default function useSinglePageFeatures(isSaved: boolean, id: string) {
  const [saved, setSaved] = useState(isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return { saved, handleSave };
}
