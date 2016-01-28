import { REQUEST_PEOPLE, RECEIVE_PEOPLE } from '../actions/people';
import Immutable from 'immutable';
import _ from 'lodash';

const InitialState = new Immutable.Record({
  list: new Immutable.Map(),
  total: null,
  page: 0,
  isLoading: false
});

export default function peopleReducer(people = new InitialState(), action) {
  switch (action.type) {
  case REQUEST_PEOPLE:
    return people.set('isLoading', true);
  case RECEIVE_PEOPLE:
    return people.set('isLoading', false)
                 .set('list', Immutable.fromJS(_.keyBy(action.people, 'id')))
                 .set('total', action.total)
                 .set('page', action.page);
  default:
    return people;
  }
}
