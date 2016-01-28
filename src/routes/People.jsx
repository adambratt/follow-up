import React from 'react';
import { connect } from 'react-redux';
import { loadPeople } from '../actions/people';
import PersonRow from '../components/PersonRow';

class People extends React.Component {
  componentWillMount() {
    if (!this.props.people || !this.props.people.size) {
      this.props.dispatch(loadPeople());
    }
  }  
  render() {
    return (
      <section className="people">
        <div className="people-list-person people-list-header">
          <div className="people-list-person__stage">Stage</div>
          <div className="people-list-person__name">Name</div>
          <div className="people-list-person__email">Email</div>
          <div className="people-list-person__phone">Phone</div>
          <div className="people-list-person__agent">Assigned Agent</div>
        </div>

        {/* Loop through and render rows */}

        {this.props.people.valueSeq().map(person => (
          <PersonRow person={person} key={person.get('id')} />
        ))}

        {/* Loading Status */}

        {this.props.isLoading ? (
          <div className="people-list-loader">Loading</div>
        ) : ''}
      </section>
    );
  }
}

People.propTypes = {
  people: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool
};

function selectPeople(state) {
  return {
    people: state.people.get('list'),
    isLoading: state.people.get('isLoading')
  };
}

export default connect(selectPeople)(People);
