import React from 'react';
import { connect } from 'react-redux';
import { loadPeople } from '../actions/people';
import PersonRow from '../components/PersonRow';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class People extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount() {
    if (!this.props.user || !this.props.user.get('id')) {
      this.history.pushState(null, '/');
      return;
    }
    if (!this.props.people || !this.props.people.size) {
      this.props.dispatch(loadPeople());
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(e) {
    const body = e.srcElement.body;
    // We trigger auto-load when within 200px of window bottom
    if (window.innerHeight + body.scrollTop > body.scrollHeight - 200) {
      this.props.dispatch(loadPeople());
    }
  }
  render() {
    return (
      <section className="people">
        <div className="people-list-person people-list-header">
          <div className="people-list-person__stage">Stage</div>
          <div className="people-list-person__name">Name</div>
          <div className="people-list-person__email">Email</div>
          <div className="people-list-person__phone">Phone</div>
          <div className="people-list-person__agent">Assigned Agent</div>
        </div>

        {/* Loop through and render rows */}

        {this.props.people.map(person => (
          <PersonRow person={person} key={person.get('id')} />
        ))}

        {/* Loading Status */}

        {this.props.isLoadingPeople ? (
          <div className="people-list-loader">
            {/* Taken from http://tobiasahlin.com/spinkit/ */}
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        ) : ''}
      </section>
    );
  }
}

reactMixin.onClass(People, History);

People.propTypes = {
  people: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  isLoadingPeople: React.PropTypes.bool,
  appLoaded: React.PropTypes.bool,
  user: React.PropTypes.object
};

function selectPeople(state) {
  return {
    people: state.people.get('list'),
    isLoadingPeople: state.people.get('loadingPeople'),
    appLoaded: state.people.get('appLoaded'),
    user: state.user
  };
}

export default connect(selectPeople)(People);
