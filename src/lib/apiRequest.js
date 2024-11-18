// apiRequest.js
import axios from "axios";
import getUserToken from "./getUserToken";
const apiRequest = () => {
  const token = getUserToken();
  console.log("🚀 ~ apiRequest ~ token:", token);
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api`,
    //withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  return instance;
};

export default apiRequest;
