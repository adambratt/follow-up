import { LOGIN_USER, LOGOUT_USER, REQUEST_LOGIN } from '../actions/user';
import Immutable from 'immutable';

// We're doing this rather than mapping all keys out in a record...
function getInitialState() {
  return new Immutable.Map({
    isLoading: false
  });
}

export default function userReducer(user = getInitialState(), action) {
  switch (action.type) {
  case LOGIN_USER:
    return user.merge(action.user).set('isLoading', false);
  case LOGOUT_USER:
    return getInitialState();
  case REQUEST_LOGIN:
    return user.set('isLoading', true).delete('errorMessage');
  default:
    return user;
  }
}
