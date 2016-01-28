import React from 'react';
import { connect } from 'react-redux';
import { attemptUserLogin } from '../actions/user';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import ErrorBox from '../components/ErrorBox';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user.get('id')) {
      this.history.pushState(null, '/people/');
    }
  }
  componentDidMount() {
    this.refs.username.focus();
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
  user: React.PropTypes.object
};

function selectUser(state) {
  return {
    user: state.user
  };
}

export default connect(selectUser)(Login);
