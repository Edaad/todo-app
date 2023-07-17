export const loggedinUser = (username) => {
  return {
    type: "CURRENT_USER",
    username,
  };
};

export const isLoggedIn = (payload) => {
  return {
    type: "IS_LOGGED_IN",
    payload,
  }
}