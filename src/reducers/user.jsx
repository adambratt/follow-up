import { LOGIN_USER } from '../actions/user';
import Immutable from 'immutable';

export default function userReducer(user = new Immutable.Map({}), action) {
  switch (action.type) {
  case LOGIN_USER:
    console.log('logged in', action);
    return user.merge(action.user);
  default:
    return user;
  }
}
