import { Params, defer } from "react-router-dom";
import apiRequest from "./apiRequest";

type PROPS = {
  request: Request;
  params: Params;
};
interface UserType {
  avatar: string | null;
  username: string;
}
export interface PostDetailType {
  id: string;
  postId: string;
  bus: number;
  desc: string;
  income: string;
  pet: string;
  restaurant: number;
  school: number;
  size: number;
  utilities: string;
}
export interface PostType {
  id: string;
  address: string;
  bathroom: number;
  bedroom: number;
  city: string;
  createdAt: string;
  images: Array<string>;
  latitude: string;
  longitude: string;
  postDetail: PostDetailType;
  price: number;
  property: string;
  title: string;
  type: string;
  user: UserType;
  userId: string;
}

export const singlePageLoader = async ({ request, params }: PROPS) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }: PROPS) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};
