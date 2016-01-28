import React from 'react';
import { connect } from 'react-redux';

class Person extends React.Component {
  render() {
    return (
      <div className="person">
        {this.props.person.get('firstName')}
        {this.props.person.get('lastName')}
      </div>
    );
  }
}

Person.propTypes = {
  person: React.PropTypes.object,
  params: React.PropTypes.object
};

function selectPerson(state, props) {
  console.log('got', props, state);
  console.log(state.people.list.toJS());
  console.log(state.people.list.get(props.params.personId, {}));
  return {
    person: state.people.list.get(props.params.personId, {})
  };
}

export default connect(selectPerson)(Person);
