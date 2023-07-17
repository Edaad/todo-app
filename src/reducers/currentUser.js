const currentUser = (state = "", action) => {
  switch (action.type) {
    case "CURRENT_USER": {
      const { username } = action;
      return {
        username,
      };
    }
    // case "IS_LOGGED_IN": {
    //   const { payload } = action;
    //   return {
    //     payload,
    //   };
    // }
    default:
      return state;
  }
};

export default currentUser;
