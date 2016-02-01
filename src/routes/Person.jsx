import React from 'react';
import { connect } from 'react-redux';
import { updatePerson } from '../actions/people';
import PersonSelectField from '../components/PersonSelectField';
import PersonInputField from '../components/PersonInputField';
import PersonContactField from '../components/PersonContactField';
import { History, Link } from 'react-router';
import reactMixin from 'react-mixin';
import _ from 'lodash';

class Person extends React.Component {
  inputChange(field) {
    return value => {
      this.props.dispatch(updatePerson(this.props.person.get('id'), field, value));
    };
  }
  componentWillMount() {
    if (!this.props.user || !this.props.user.get('id')) {
      this.history.pushState(null, '/');
    }
  }
  render() {
    if (!this.props.person) {
      return (
        <div className='person'>Error loading page</div>
      );
    }

    // Have to do this to get the sourceId as it's not returned in the people API
    const source =  _.find(this.props.sources, source => source[1] === this.props.person.get('source'));
    const sourceId = source ? source[0] : 1;

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
          <PersonSelectField label="Source" onChange={this.inputChange('sourceId')}
             value={sourceId} values={this.props.sources} />
          <PersonSelectField label="Assigned Agent" onChange={this.inputChange('assignedUserId')}
             value={this.props.person.get('assignedUserId')} values={this.props.agents} />
           <PersonSelectField label="Stage" onChange={this.inputChange('stage')}
              value={this.props.person.get('stage')} values={this.props.stages} />
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
  user: React.PropTypes.object,
  stages: React.PropTypes.object,
  sources: React.PropTypes.any,
  agents: React.PropTypes.any
};

function selectPerson(state, props) {
  return {
    // Find a match in list - coerce ID to a string for comparison with URL param
    person: state.people.list.find(person => props.params.personId === person.get('id') + ''),
    user: state.user,
    stages: state.people.get('stages'),
    sources: state.people.get('sources'),
    agents: state.people.get('agents')
  };
}

export default connect(selectPerson)(Person);
