import { ActionTypes } from '../actions';

const initialState = {
  name: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        name: action.payload.name, email: action.payload.email,
      };
    case ActionTypes.LOG_OUT:
      return {
        name: initialState.name, email: initialState.email,
      };
    default:
      return {
        name: initialState.name, email: initialState.email,
      };
  }
};

export default userReducer;
