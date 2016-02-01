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

  getValue() {
    if (this.props.value !== null) {
      if (this.props.items.constructor === Array) {
        const v = _.find(this.props.items, pair => pair[0] === this.props.value);
        if (!v) {
          console.log('wtf', v, this.props.value, this.props.items);
          return 'fake';
        }
        return v[1];
      } else {
        return this.props.items[this.props.value];
      }
    } else {
      return this.props.defaultText || 'Select...';
    }
  }

  render() {
    return (
      <div className={classnames('dropdown-menu', {'dropdown-menu--active': this.state.active})}>
        <div className="dropdown-menu__button" onClick={this.buttonClick.bind(this)}>
          {this.getValue()}
        </div>
        <ul className="dropdown-menu__list">
          {_.map(this.props.items, (v, k) => v.constructor === Array ?
            // Dropdown takes both {k: v} and [k, v] formats
            (<li key={v[0]} onClick={(e) => this.itemClick(e, v[0])}>{v[1]}</li>) :
            (<li key={k} onClick={(e) => this.itemClick(e, k)}>{v}</li>)
          )}
        </ul>
      </div>
    );
  }
}

SelectDropdown.propTypes = {
  // Items can either be an object or an array of key value pairs
  items: React.PropTypes.any,
  value: React.PropTypes.any,
  defaultText: React.PropTypes.string,
  onChange: React.PropTypes.func
};

reactMixin.onClass(SelectDropdown, OnClickOutside);

export default SelectDropdown;
