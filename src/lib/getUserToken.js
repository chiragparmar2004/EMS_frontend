const getUserToken = () => {
  const token = localStorage.getItem("token");
  const userToken = token;
  return userToken;
};

export default getUserToken;
