let accessToken = "";

export const setAccessToken = (token: string) => {
  setStorage(token);
  accessToken = token;
};
export const getAccessToken = () => {
  return accessToken;
};
export const setStorage = (userToken: string) => {
  localStorage.setItem("token", JSON.stringify(userToken));
};

export const validateAccessToken = (token: string) => {
  return fetch("http://localhost:1337/users/validate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export async function getMembers() {
  return fetch("http://localhost:1337/members/getAllMembers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
