import React from 'react';

class PersonInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditing: false
    };
    this.inputBlur = this.inputBlur.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.state.isEditing) {
      this.setState({isEditing: true}, () => this.refs.input.focus());
    }
  }
  inputBlur() {
    this.saveInput();
  }
  inputChange(e) {
    this.setState({value: e.target.value});
  }
  inputKeyPress(e) {
    if (e.key === 'Enter') {
      this.saveInput();
    }
  }
  saveInput() {
    this.props.onChange(this.state.value);
    this.setState({isEditing: false});
  }
  render() {
    return (
      <div className="person-field" onClick={this.handleClick}>
        <label className="person-field-label">{this.props.label}</label>
        <div className="person-field-value">
          {this.state.isEditing ? (
            <input type="text" value={this.state.value} onBlur={this.inputBlur}
               onChange={this.inputChange} onKeyPress={this.inputKeyPress} ref="input" />
          ) : (
            <span>{this.state.value} <i className="fa fa-pencil"></i></span>
          )}
        </div>
      </div>
    );
  }
}

PersonInputField.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default PersonInputField;
