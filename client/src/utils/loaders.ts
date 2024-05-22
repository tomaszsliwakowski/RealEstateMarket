import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

type PROPS = {
  request: any;
  params: any;
};

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
