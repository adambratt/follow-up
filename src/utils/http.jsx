
export function makeHTTPAuthString(username, password) {
  return 'Basic ' + btoa(username + ':' + password);
}
