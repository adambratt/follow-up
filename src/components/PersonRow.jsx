import React from 'react';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class PersonRow extends React.Component {
  handleRowClick(personId) {
    console.log('hi');
    this.history.pushState(null, '/people/' + personId);
  }
  render() {
    const person = this.props.person;
    return (
      <div className="people-list-person" key={person.get('id')}
         onClick={() => this.handleRowClick(person.get('id'))} >
        <div className="people-list-person__stage">
          <span className={'stage stage-' + person.get('stage').toLowerCase().replace(' ', '')}>
            {person.get('stage')}
          </span>
        </div>
        <div className="people-list-person__name">
          {person.firstName} {person.get('lastName')}
        </div>
        <div className="people-list-person__email">
          {person.get('emails').size ? person.getIn(['emails', 0, 'value']) : ''}
        </div>
        <div className="people-list-person__phone">
          {person.get('phones').size ? person.getIn(['phones', 0, 'value']) : ''}
        </div>
        <div className="people-list-person__agent">
          {person.get('assignedTo')}
        </div>
      </div>
    );
  }
}

reactMixin.onClass(PersonRow, History);

PersonRow.propTypes = {
  person: React.PropTypes.object.isRequired
};

export default PersonRow;
