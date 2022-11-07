import requestHandler from "./requestHandler";

export const getUser = async (userId) => {
  console.log(userId, "userId==");
  return requestHandler.get(`/users/${userId}`).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  });
};

export const getUsers = async () => {
  return requestHandler.get("/users").then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  });
};
