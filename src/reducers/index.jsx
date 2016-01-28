import { combineReducers } from 'redux';
import userReducer from './user';
import peopleReducer from './people';

const combinedReducer = combineReducers({
  user: userReducer,
  people: peopleReducer
});

export default combinedReducer;
