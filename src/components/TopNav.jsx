import React from 'react';
import { connect } from 'react-redux';

class TopNav extends React.Component {
  render() {
    return (
      <section className="header">
        <a href="/" className="logo">Follow Up Boss</a>
      </section>
    );
  }
}

TopNav.propTypes = {
};

export default connect()(TopNav);
