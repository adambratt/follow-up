import React from 'react';
import { connect } from 'react-redux';

class TopNav extends React.Component {
  render() {
    return (
      <section className="header">
        <a href="/" className="logo">Follow Up Boss</a>
        {this.props.user && this.props.user.get('name') ? (
          <div className="user">
            {this.props.user.get('name')} <i className="fa fa-angle-down"></i>
          </div>
        ) : ''}
      </section>
    );
  }
}

TopNav.propTypes = {
  user: React.PropTypes.object
};

function selectUser(state) {
  return {
    user: state.user
  };
}

export default connect(selectUser)(TopNav);
