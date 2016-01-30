import fetch from 'isomorphic-fetch';
import store from '../store';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';

function loginAction(userData) {
  return {
    type: LOGIN_USER,
    user: userData
  };
}

function logoutAction() {
  return {
    type: LOGOUT_USER
  };
}

function requestLoginAction() {
  return {
    type: REQUEST_LOGIN
  };
}

/**
 * Checks to see if we currently have a user stored in local storage and if so
 * retrieves the user data and logs us in
 */
export function checkUserStorage() {
  if (localStorage.user) {
    const userData = JSON.parse(localStorage.user);
    store.dispatch(loginAction(userData));
  }
}

/**
 * Handles logging out a user and destroying any user data in local storage
 */
export function userLogout() {
  return (dispatch, getState) => {
    localStorage.removeItem('user');
    dispatch(logoutAction());
  };
}

/**
 * Simple login action that takes a username and password and attempts to login
 * via HTTP Basic Auth. On return, we store the returned user data. It's a bit
 * of a hack but right now even if there is an error we store that and handle it
 * in the Login componenent that listens to the user store state.
 *
 * @param {str} username
 * @param {str} password
 */
export function attemptUserLogin(username, password) {
  return (dispatch, getState) => {
    dispatch(requestLoginAction());

    const encodedAuth = 'Basic ' + btoa(username + ':' + password);

    fetch('https://api.followupboss.com/v1/me', {
      headers: { authorization: encodedAuth }
    })
    .then(response => response.json())
    .then(data => {
      // Store user data in local storage in case page refreshes
      if (data.apiKey) {
        localStorage.user = JSON.stringify(data);
      }
      dispatch(loginAction(data));
    });
  };
}
