import React from 'react';
import { connect } from 'react-redux';
import { attemptUserLogin, checkUserStorage } from '../actions/user';
import { loadAppData } from '../actions/people';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import ErrorBox from '../components/ErrorBox';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
  }
  componentWillMount() {
    if (this.props.user && this.props.user.get('id')) {
      // User is logged in, now check to see if app is loaded
      if (this.props.appLoaded) {
        this.history.pushState(null, '/people/');
      } else {
        this.props.dispatch(loadAppData());
      }
    } else {
      checkUserStorage();
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user.get('id')) {
      // User is logged in, now check to see if app is loaded
      if (nextProps.appLoaded) {
        this.history.pushState(null, '/people/');
      } else {
        this.props.dispatch(loadAppData());
      }
    }
  }
  componentDidMount() {
    if (!this.props.appLoaded) {
      this.refs.username.focus();
    }
  }
  inputKeyPress(e) {
    if (e.key === 'Enter') {
      this.submitForm();
    }
  }
  submitForm() {
    this.props.dispatch(attemptUserLogin(this.refs.username.value, this.refs.password.value));
  }
  render() {
    if (this.props.user.get('id') && !this.props.appLoaded) {
      // Return loader...this should eventually really be it's own component
      return (
        <div className="app-loader">
          <div className="app-loader__text">
            Starting Application...
          </div>
          {/* Taken from http://tobiasahlin.com/spinkit/ */}
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      );
    }
    return (
      <div className="login-box">
        <ErrorBox message={this.props.user.get('errorMessage') ? 'Invalid Email/Password combination' : null} />
        <label className="login-box-username">
          <i className="fa fa-user" />
          <input type="text" name="username" placeholder="Email" onKeyPress={this.inputKeyPress}
             ref="username" />
        </label>
        <label className="login-box-password">
          <i className="fa fa-key" />
          <input type="password" name="password" placeholder="Password" onKeyPress={this.inputKeyPress}
             ref="password" />
        </label>
        <button onClick={this.submitForm} disabled={this.props.user.get('isLoading')}>
          Login
        </button>
      </div>
    );
  }
}

reactMixin.onClass(Login, History);

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  appLoaded: React.PropTypes.bool
};

function selectUser(state) {
  return {
    user: state.user,
    appLoaded: state.people.get('appLoaded')
  };
}

export default connect(selectUser)(Login);
