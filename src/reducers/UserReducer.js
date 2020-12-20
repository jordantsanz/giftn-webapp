import { ActionTypes } from '../actions';

const initialState = {
  name: '',
  budget: 0,
  people: [],
  trackingNumbers: [],
  id: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        name: action.payload.name, id: action.payload.id, budget: action.payload.budget, people: action.payload.people, trackingNumbers: action.payload.trackingNumbers,
      };
    case ActionTypes.LOG_OUT:
      return {
        name: initialState.name, id: initialState.id, budget: initialState.budget, people: initialState.people, trackingNumbers: initialState.trackingNumbers,
      };
    case ActionTypes.UPDATE_USER:
      return {
        name: action.payload.name, id: action.payload.id, budget: action.payload.budget, people: action.payload.people, trackingNumbers: action.payload.trackingNumbers,
      };
    default:
      return {
        name: initialState.name, id: initialState.id, budget: initialState.budget, people: initialState.people, trackingNumbers: initialState.trackingNumbers,
      };
  }
};

export default userReducer;
