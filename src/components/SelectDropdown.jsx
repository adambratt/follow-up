import React from 'react';
import classnames from 'classnames';
import reactMixin from 'react-mixin';
import OnClickOutside from 'react-onclickoutside';
import _ from 'lodash';

export default class SelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  buttonClick() {
    this.setState({active: !this.state.active});
  }

  itemClick(e, key) {
    this.props.onChange(key);
    this.setState({active: !this.state.active});
  }

  handleClickOutside(e) {
    if (this.state.active) {
      this.setState({active: false});
    }
  }

  render() {
    return (
      <div className={classnames('dropdown-menu', {'dropdown-menu--active': this.state.active})}>
        <div className="dropdown-menu__button" onClick={this.buttonClick.bind(this)}>
          {((this.props.value !== null) ? this.props.items[this.props.value] : this.props.defaultText)  || 'Select...'}
        </div>
        <ul className="dropdown-menu__list">
          {_.map(this.props.items, (v, k) => <li key={k} onClick={(e) => this.itemClick(e, k)}>{v}</li>)}
        </ul>
      </div>
    );
  }
}

SelectDropdown.propTypes = {
  items: React.PropTypes.object,
  value: React.PropTypes.string,
  defaultText: React.PropTypes.string,
  onChange: React.PropTypes.func
};

reactMixin.onClass(SelectDropdown, OnClickOutside);

export default SelectDropdown;
