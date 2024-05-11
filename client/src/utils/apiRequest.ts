import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
export default apiRequest;

//user
export const registerUrl = `/auth/register`;
export const loginUrl = `/auth/login`;
export const logOutUrl = "/auth/logout";
export const loggedUrl = "/auth/logged";
