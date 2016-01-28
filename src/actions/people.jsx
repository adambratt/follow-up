import { makeHTTPAuthString } from '../utils/http';

const PEOPLE_PER_PAGE = 100;
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE';
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
export const UPDATE_PERSON = 'UPDATE_PERSON';


function requestPeopleAction() {
  return {
    type: REQUEST_PEOPLE
  };
}

function receivePeopleAction(peopleList, total, page = 1) {
  return {
    type: RECEIVE_PEOPLE,
    people: peopleList,
    total,
    page
  };
}

function updatePersonAction(personId, personData) {
  return {
    type: UPDATE_PERSON,
    person: personData,
    personId
  };
}

/**
 * Quick kludge that we use for all requests that need authorization. In a
 * fuller production environment, we would build out a central interface to handle
 * all of this instead of throwing it in an action file
 *
 * @param {object} state object from store
 */
function getAPIAuth(state) {
  const key = state.user.get('apiKey');
  return makeHTTPAuthString(key, 'nopassword');
}

/**
 * Dispatches an action to signify loading started and then requests a page full
 * of people objects from the server. Once loaded, they are concatenated to the state
 *
 * @param {int} page of people to load
 */
function requestPeople(page = 1) {
  return (dispatch, getState) => {
    const query = 'limit=' + PEOPLE_PER_PAGE + '&offset=' + PEOPLE_PER_PAGE * (page - 1);
    dispatch(requestPeopleAction());
    fetch('https://api.followupboss.com/v1/people?' + query, {
      headers: { authorization: getAPIAuth(getState()) }
    })
    .then(response => response.json())
    .then(data => {
      dispatch(receivePeopleAction(data.people, data._metadata.total, page));
    });
  };
}

/**
 * Checks the state to see if a "people" request is currently pending
 *
 * @param {object} people state object from store
 */
function isLoadingPeople(state) {
  return state.get('loadingPeople', false);
}

/**
 * Checks the state to see if a "person" request is currently pending
 *
 * @param {object} people state object from store
 */
function isLoadingPerson(state) {
  return state.get('loadingPerson', false);
}

/**
 * Checks to see if we are currently able to load more people and then fires an action
 * to load the next available page
 */
export function loadPeople() {
  return (dispatch, getState) => {
    const peopleState = getState().people;
    // Don't do anything if we are already loading people
    if (isLoadingPeople(peopleState)) {
      console.log('stop');
      return;
    }
    const currentPage = peopleState.get('page', 0);
    // Check to make sure there are more pages of people to get
    console.log(currentPage, 'hi');
    if (currentPage && peopleState.get('total') <= currentPage * PEOPLE_PER_PAGE) {
      console.log('oops');
      return;
    }
    dispatch(requestPeople(currentPage + 1));
  };
}

/**
 * Updates a single field on a person object
 *
 * @param {int} personId we will be updating
 * @param {str} field name on person object to update
 * @param {?obj} value to update the field with. can be dictionary or single value
 */
export function updatePerson(personId, field, value) {
  return (dispatch, getState) => {
    const peopleState = getState().people;
    if (isLoadingPerson(peopleState)) {
      return;
    }
    fetch('https://api.followupboss.com/v1/people/' + personId, {
      headers: { authorization: getAPIAuth(getState()), 'Content-Type': 'application/json' },
      method: 'put',
      body: JSON.stringify({[field]: value})
    })
    .then(response => response.json())
    .then(data => {
      dispatch(updatePersonAction(data));
    });
  };
}
