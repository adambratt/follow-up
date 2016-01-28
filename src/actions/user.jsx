import fetch from 'isomorphic-fetch';
import store from '../store';

export const LOGIN_USER = 'LOGIN_USER';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';

function loginAction(userData) {
  return {
    type: LOGIN_USER,
    user: userData
  };
}

function requestLoginAction() {
  return {
    type: REQUEST_LOGIN
  };
}

export function attemptUserLogin(username, password) {
  return (dispatch, getState) => {
    dispatch(requestLoginAction());

    const encodedAuth = 'Basic ' + btoa(username + ':' + password);

    fetch('https://api.followupboss.com/v1/me', {
      headers: { authorization: encodedAuth }
    })
    .then(response => response.json())
    .then(data => {
      store.dispatch(loginAction(data));
      console.log(data);
    });
  };
}
