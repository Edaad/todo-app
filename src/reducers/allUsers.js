const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER": {
      const { payload } = action;
      return {
        ...state,
        users: [payload, ...state.users],
      };
    }
    case "DELETE_USER": {
      const userToDelete = action.payload;
      state.users = state.users.filter((user) => user !== userToDelete)
    }

    default:
      return state;
  }
};

export default allUsers;
