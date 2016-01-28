import { makeHTTPAuthString } from '../utils/http';

const PEOPLE_PER_PAGE = 50;
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE';
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';


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

// Here for now, eventually this would be put in a more central interface
function getAPIAuth(state) {
  const key = state.user.get('apiKey');
  return makeHTTPAuthString(key, 'nopassword');
}

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

function isLoadingPeople(state) {
  return state.get('isLoading');
}

export function loadPeople() {
  return (dispatch, getState) => {
    const peopleState = getState().people;
    // Don't do anything if we are already loading people
    if (isLoadingPeople(peopleState)) {
      return;
    }
    const currentPage = peopleState.get('page', 0);
    // Check to make sure there are more pages of people to get
    if (currentPage && peopleState.get('total') > currentPage * PEOPLE_PER_PAGE) {
      return;
    }
    dispatch(requestPeople(currentPage + 1));
  };
}
