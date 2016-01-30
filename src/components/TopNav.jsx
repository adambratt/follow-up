import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../actions/user';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import classnames from 'classnames';
import OnClickOutside from 'react-onclickoutside';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside(e) {
    if (this.state.showMenu) {
      this.toggleMenu();
    }
  }
  logout() {
    this.props.dispatch(userLogout());
    this.history.pushState(null, '/');
  }
  toggleMenu() {
    this.setState({showMenu: !this.state.showMenu});
  }
  render() {
    return (
      <section className="header">
        <a href="/" className="logo">Follow Up Boss</a>
        {this.props.user && this.props.user.get('name') ? (
          <div className="user" onClick={() => this.toggleMenu()}>
            {this.props.user.get('name')} <i className="fa fa-angle-down"></i>
            <ul className={classnames('user-menu', {'hidden': !this.state.showMenu})}>
              <li onClick={() => this.logout()}>Logout</li>
            </ul>
          </div>
        ) : ''}
      </section>
    );
  }
}

reactMixin.onClass(TopNav, History);
reactMixin.onClass(TopNav, OnClickOutside);

TopNav.propTypes = {
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function selectUser(state) {
  return {
    user: state.user
  };
}

export default connect(selectUser)(TopNav);
