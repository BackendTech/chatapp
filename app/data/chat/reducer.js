export const ADD_MESSAGE = 'add_message';
export const ADD_USER = 'add_user';
const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const {items = [], ...rest} = state;
      return {...rest, items: [...items, action.data]};
    case ADD_USER:
      const {username, ...rest1} = state;
      return {...rest1, username: action.data};
    default:
      return state;
  }
};

export default chatReducer;
