import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

type FormInputsType = {
  address: string;
  bathroom: string;
  bedroom: string;
  bus: string;
  city: string;
  income: string;
  latitude: string;
  longitude: string;
  pet: string;
  price: string;
  property: string;
  restaurant: string;
  school: string;
  size: string;
  title: string;
  type: string;
  utilities: string;
};

export default function useNewPage() {
  const [value, setValue] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const changeValue = (value: string) => {
    setValue(value);
  };
  const handleImages = (value: string) => {
    setImages((prev) => [...prev, value]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData) as FormInputsType;

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as any;
      setError(errorData.message);
    }
  };
  return { value, images, error, handleImages, changeValue, handleSubmit };
}
