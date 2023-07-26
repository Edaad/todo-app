export const allUsers = (payload) => ({
  type: "ALL_USERS",
  payload,
});

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const deleteUser = (user) => {
  return {
    type: "DELETE_USER",
    payload: user,
  };
};

// action to check if username is taken
