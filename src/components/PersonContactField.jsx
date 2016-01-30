import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import SelectDropdown from './SelectDropdown';
import Immutable from 'immutable';

const contactTypes = {home: 'home', work: 'work', mobile: 'mobile', other: 'other'};

class PersonContactField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: this.props.contacts,
      isEditing: false
    };

  }
  addContact() {
    this.setState({
      contacts: this.state.contacts.push(new Immutable.Map({
        isPrimary: this.state.contacts.size > 0 ? '0' : '1',
        value: '',
        type: 'home'
      }))
    });
  }
  removeContact(key) {
    // Don't allow removing last contact
    if (this.state.contacts.size < 2) {
      console.log('oops');
      return;
    }
    // If this was the primary, make the new first contact the primary
    const wasPrimary = this.state.contacts.getIn([key, 'isPrimary']);
    let newContacts = this.state.contacts.delete(key);
    if (wasPrimary) {
      newContacts = newContacts.setIn([0, 'isPrimary'], '1');
    }
    this.setState({contacts: newContacts});
  }
  edit() {
    this.setState({isEditing: true});
  }
  save() {
    this.props.onChange(this.state.contacts.toJS());
    this.setState({isEditing: false});
  }
  setPrimary(key) {
    this.setState({
      // Set all contacts to not primary and then update the chosen contact as primary
      contacts: this.state.contacts.map(contact => contact.set('isPrimary', '0'))
                                   .setIn([key, 'isPrimary'], '1')
    });
  }
  typeChange(val, key) {
    this.setState({
      contacts: this.state.contacts.setIn([key, 'type'], val)
    });
  }
  valueChange(e, key) {
    this.setState({
      contacts: this.state.contacts.setIn([key, 'value'], e.target.value)
    });
  }
  renderEditing() {
    return (
      <div className="person-contacts editing">
        <label className="person-contacts-label">{this.props.label}</label>

        {this.state.contacts.map((contact, key) => (
          <div className="person-contact" key={key}>

            <input type="text" className="person-contact-input" value={contact.get('value')}
               onChange={(e) => this.valueChange(e, key)}/>

            <SelectDropdown items={contactTypes} value={contact.get('type', 'home')}
               onChange={(val) => this.typeChange(val, key)}/>

            <i className={classnames('fa', contact.get('isPrimary') === '1' ? 'fa-star' : 'fa-star-o')}
               onClick={() => this.setPrimary(key)} />

            {this.state.contacts.size > 1 ? (
              <i className='fa fa-trash' onClick={() => this.removeContact(key)} />
            ) : ''}

          </div>
        ))}

        <button className="person-contacts-add" onClick={() => this.addContact()}>
          + Add
        </button>
        <button className="person-contacts-save" onClick={() => this.save()}>
          Save
        </button>
      </div>
    );
  }
  renderNormal() {
    return (
      <div className="person-contacts" onClick={() => this.edit()}>
        <i className="fa fa-edit edit" />
        <label className="person-contacts-label">{this.props.label}</label>
        {this.state.contacts.map((contact, key) => (
          <div className="person-contact" key={key}>
            <span className="person-contact-value">{contact.get('value')}</span>
            <span className="person-contact-type">{contact.get('type')}</span>
            {contact.get('isPrimary') === '1' ? (<i className="fa fa-star" />) : ''}
          </div>
        ))}
      </div>
    );
  }
  render() {
    if (!this.state.isEditing) {
      return this.renderNormal();
    }
    return this.renderEditing();
  }
}

PersonContactField.propTypes = {
  contacts: React.PropTypes.object,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default PersonContactField;
