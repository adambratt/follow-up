import React from 'react';
import TopNav from '../components/TopNav';

class App extends React.Component {
    render() {
      return (
        <div className="layout">
          <TopNav />
          <section className="main">
            {this.props.children}
          </section>
        </div>
      );
    }
}

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
