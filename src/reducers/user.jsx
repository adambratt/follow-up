import { LOGIN_USER, REQUEST_LOGIN } from '../actions/user';
import Immutable from 'immutable';

const InitialState = new Immutable.Map({
  isLoading: false
});

export default function userReducer(user = InitialState, action) {
  switch (action.type) {
  case LOGIN_USER:
    console.log('logged in', action);
    return user.merge(action.user).set('isLoading', false);
  case REQUEST_LOGIN:
    console.log('loading');
    return user.set('isLoading', true).delete('errorMessage');
  default:
    return user;
  }
}
