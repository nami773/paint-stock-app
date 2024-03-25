import Cookies from "js-cookie";

// The authentication is beyond the scope of this project so the user credentials are hard-coded

const defaultUser = { username: "default", password: "7xe3ho6g" };

const users = {
  jane: "H8ikW7MH",
  john: "p2oCd58i",
  painter: "0N5GM056",
  adam: "BeM4zo01",
};

export const setUser = (username) => {
  let password = users[username];
  Cookies.set("username", username);
  Cookies.set("password", password);
};

export const getUser = () => {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  if (username in users && users[username] === password) {
    return { username, password };
  }
  // If no valid username or password found in cookies, return the default user
  return defaultUser;
};

export const getUsername = () => {
  const username = Cookies.get("username");
  return username;
};

export const unsetUser = () => {
  Cookies.remove("username");
  Cookies.remove("password");
};