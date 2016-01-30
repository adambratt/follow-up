import React from 'react';
import SelectDropdown from './SelectDropdown';
import OnClickOutside from 'react-onclickoutside';
import reactMixin from 'react-mixin';

class PersonSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.value
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClick() {
    if (!this.state.isEditing) {
      this.setState({isEditing: true});
    }
  }
  handleClickOutside(e) {
    this.setState({isEditing: false});
  }
  saveInput(value) {
    this.setState({value});
    this.props.onChange(value);
    this.setState({isEditing: false});
  }
  render() {
    return (
      <div className="person-field" onClick={this.handleClick}>
        <label className="person-field-label">{this.props.label}</label>
        <div className="person-field-value">
          {this.state.isEditing ? (
            <SelectDropdown onChange={(val) => this.saveInput(val)} items={this.props.values}
               value={this.state.value} />
          ) : (
            <span>{this.props.values[this.state.value]} <i className="fa fa-pencil"></i></span>
          )}
        </div>
      </div>
    );
  }
}

reactMixin.onClass(PersonSelectField, OnClickOutside);

PersonSelectField.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.any,
  values: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default PersonSelectField;
