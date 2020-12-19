// the starting point for your redux store
import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  user: UserReducer,
});

export default rootReducer;
