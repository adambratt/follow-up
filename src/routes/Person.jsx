import React from 'react';
import { connect } from 'react-redux';
import PersonInputField from '../components/PersonInputField';
import { updatePerson } from '../actions/people';

class Person extends React.Component {
  inputChange(field) {
    return value => {
      console.log(field + ' changed to ', value);
      this.props.dispatch(updatePerson(this.props.person.get('id'), field, value));
    };
  }
  render() {
    return (
      <div className="person">
        <div className="person-sidebar">
          <div className="person-sidebar-picture">
            {this.props.person.get('picture') ? (
              <img src={this.props.person.getIn(['picture', 'small'])} />
            ) : (
              <img src={require('../assets/images/noimage.png')} />
            )}
          </div>
          <button className="delete-button" onClick={() => alert('Not implemented for safety!')}>
            Delete Person
          </button>
        </div>
        <div className="person-fields">
          <h2 className="person-title">Profile Info</h2>
          <PersonInputField label="First Name" onChange={this.inputChange('firstName')}
             value={this.props.person.get('firstName')} />
          <PersonInputField label="Last Name" onChange={this.inputChange('lastName')}
             value={this.props.person.get('lastName')} />
          <PersonInputField label="Source" onChange={this.inputChange('source')}
             value={this.props.person.get('source')} />
           <PersonInputField label="Assigned Agent" onChange={this.inputChange('assignedTo')}
              value={this.props.person.get('assignedTo')} />
         </div>
         <div className="person-fields">
           <h2 className="person-title">Contact Info</h2>
           <PersonInputField label="First Name" onChange={this.inputChange('firstName')}
              value={this.props.person.get('firstName')} />
           <PersonInputField label="Last Name" onChange={this.inputChange('lastName')}
              value={this.props.person.get('lastName')} />
           <PersonInputField label="Source" onChange={this.inputChange('source')}
              value={this.props.person.get('source')} />
            <PersonInputField label="Assigned Agent" onChange={this.inputChange('assignedTo')}
               value={this.props.person.get('assignedTo')} />
          </div>
      </div>
    );
  }
}

Person.propTypes = {
  person: React.PropTypes.object,
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function selectPerson(state, props) {
  return {
    // Find a match in list - coerce ID to a string for comparison with URL param
    person: state.people.list.find(person => props.params.personId === person.get('id') + '')
  };
}

export default connect(selectPerson)(Person);
