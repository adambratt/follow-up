import { makeHTTPAuthString } from '../utils/http';

const PEOPLE_PER_PAGE = 100;
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE';
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const APP_LOADED = 'APP_LOADED';


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

function appLoadedAction(agents, sources, stages) {
  return {
    type: APP_LOADED,
    agents,
    sources,
    stages
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
 * Gets a list of all the valid agents for a Person
 *
 * @param {str} auth string for requests
 * @returns Promise that resolves to list of agents
 */
function getAgents(auth) {
  return new Promise((resolve, reject) => {
    fetch('https://api.followupboss.com/v1/users?limit=100', {
      headers: { authorization: auth, 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      // Return an array of [k, v] pairs ordered by agent last name
      const agents = _.map(
        _.orderBy(_.reject(data.users, agent => agent.role === 'Lender'), 'lastName', 'asc'),
        agent => [agent.id, agent.name]
      );
      resolve(agents);
    });
  });
}

/**
 * Gets a list of all the valid lead sources for a Person
 *
 * @param {str} auth string for requests
 * @returns Promise that resolves to list of sources
 */
function getSources(auth) {
  return new Promise((resolve, reject) => {
    fetch('https://api.followupboss.com/v1/leadSources?limit=100', {
      headers: { authorization: auth, 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      // Return an array of [k, v] pairs ordered by source name with 1, <unspecified> being the first
      const sources = _.map(
        _.orderBy(data.leadsources, 'name', 'asc'),
        source => [source.id, source.name]
      );
      resolve(sources);
    });
  });
}

/**
 * Gets a list of all the valid stages for a Person
 *
 * @param {str} auth string for requests
 * @returns Promise that resolves to list of stages
 */
function getStages(auth) {
  return new Promise((resolve, reject) => {
    fetch('https://api.followupboss.com/v1/stages?limit=100', {
      headers: { authorization: auth, 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      const stages = _.fromPairs(_.map(data.stages, stage => [stage.id, stage.name]));
      resolve(stages);
    });
  });
}

/**
 * Loads the intial app data: sources, agents, and stages and then sets the store
 * key for appLoaded to true when they all return.
 *
 * Note: there's no error handling here at the moment
 */
export function loadAppData() {
  return (dispatch, getState) => {
    const auth = getAPIAuth(getState());
    // Make sure all 3 requests resolve before we mark the app as loaded
    Promise.all([getAgents(auth), getSources(auth), getStages(auth)]).then((data) => {
      dispatch(appLoadedAction(data[0], data[1], data[2]));
    });
  };
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
      return;
    }
    const currentPage = peopleState.get('page', 0);
    // Check to make sure there are more pages of people to get
    if (currentPage && peopleState.get('total') <= currentPage * PEOPLE_PER_PAGE) {
      return;
    }
    dispatch(requestPeople(currentPage + 1));
    dispatch(loadAppData());
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
    // Hack to make it so we can edit source
    let q = '';
    if (field === 'sourceId') {
      q += '?overwriteSource=1';
    }
    fetch('https://api.followupboss.com/v1/people/' + personId + q, {
      headers: { authorization: getAPIAuth(getState()), 'Content-Type': 'application/json' },
      method: 'put',
      body: JSON.stringify({[field]: value})
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        dispatch(updatePersonAction(personId, data));
      }
    });
  };
}
