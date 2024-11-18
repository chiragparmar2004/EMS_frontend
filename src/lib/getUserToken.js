const getUserToken = () => {
  const token = localStorage.getItem("user");
  const userToken = token;
  return userToken;
};

export default getUserToken;
