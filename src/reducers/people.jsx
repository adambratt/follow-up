import { REQUEST_PEOPLE, RECEIVE_PEOPLE, UPDATE_PERSON } from '../actions/people';
import Immutable from 'immutable';
import _ from 'lodash';

const InitialState = new Immutable.Record({
  list: new Immutable.Map(),
  total: null,
  page: 0,
  loadingPeople: false,
  loadingPerson: false
});

export default function peopleReducer(people = new InitialState(), action) {
  switch (action.type) {
  case REQUEST_PEOPLE:
    return people.set('loadingPeople', true);
  case RECEIVE_PEOPLE:
    return people.set('loadingPeople', false)
                 .set('list', Immutable.fromJS(_.keyBy(action.people, 'id')))
                 .set('total', action.total)
                 .set('page', action.page);
  case UPDATE_PERSON:
    return people.set('loadingPerson', false)
                 .setIn(['list', action.personId], action.person);
  default:
    return people;
  }
}