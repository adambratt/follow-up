import { REQUEST_PEOPLE, RECEIVE_PEOPLE, UPDATE_PERSON, APP_LOADED } from '../actions/people';
import { LOGOUT_USER } from '../actions/user';
import Immutable from 'immutable';
import _ from 'lodash';

const InitialState = new Immutable.Record({
  list: new Immutable.List(),
  total: null,
  page: 0,
  loadingPeople: false,
  loadingPerson: false,
  // These values should probably go in a global state but we're putting them here
  appLoaded: false,
  stages: null,
  sources: null,
  agents: null
});

export default function peopleReducer(people = new InitialState(), action) {
  switch (action.type) {
  case REQUEST_PEOPLE:
    return people.set('loadingPeople', true);
  case RECEIVE_PEOPLE:
    const newPeople = Immutable.fromJS(action.people);
    return people.set('list', people.get('list').concat(newPeople))
                 .set('loadingPeople', false)
                 .set('total', action.total)
                 .set('page', action.page);
  case UPDATE_PERSON:
    const match = people.get('list').findIndex(person => person.get('id') === action.personId);
    return people.set('loadingPerson', false)
                 .setIn(['list', match], Immutable.fromJS(action.person));
  case APP_LOADED:
    /* We aren't making the stages, sources, or agents Immutables.
     * In the future, this would be something to fix but for now I'd rather not
     * rewrite the <select>'s to only accept Immutables' */
    return people.set('appLoaded', true)
                 .set('stages', action.stages)
                 .set('sources', action.sources)
                 .set('agents', action.agents);
  case LOGOUT_USER:
    people = new InitialState();
    return people;
  default:
    return people;
  }
}
