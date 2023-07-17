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

    default:
      return state;
  }
};

export default allUsers;
