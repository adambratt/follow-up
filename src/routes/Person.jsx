import React from 'react';
import { connect } from 'react-redux';
import { updatePerson } from '../actions/people';
import PersonInputField from '../components/PersonInputField';
import PersonContactField from '../components/PersonContactField';
import { History, Link } from 'react-router';
import reactMixin from 'react-mixin';

class Person extends React.Component {
  inputChange(field) {
    return value => {
      console.log(field + ' changed to ', value);
      this.props.dispatch(updatePerson(this.props.person.get('id'), field, value));
    };
  }
  componentWillMount() {
    if (!this.props.user || !this.props.user.get('id')) {
      this.history.pushState(null, '/');
    }
  }
  render() {
    return (
      <div className="person">
        <div className="breadcrumbs">
          <span className="breadcrumb"><Link to='/people/'>People List</Link></span>
          <span className="breadcrumb">
            Viewing {this.props.person.get('firstName')} {this.props.person.get('lastName')}
          </span>
        </div>
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
           <PersonContactField label="Email Addresses" contacts={this.props.person.get('emails')}
              onChange={this.inputChange('emails')} />
           <PersonContactField label="Phone Numbers" contacts={this.props.person.get('phones')}
              onChange={this.inputChange('phones')} />
          </div>
      </div>
    );
  }
}

reactMixin.onClass(Person, History);

Person.propTypes = {
  person: React.PropTypes.object,
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object
};

function selectPerson(state, props) {
  return {
    // Find a match in list - coerce ID to a string for comparison with URL param
    person: state.people.list.find(person => props.params.personId === person.get('id') + ''),
    user: state.user
  };
}

export default connect(selectPerson)(Person);
