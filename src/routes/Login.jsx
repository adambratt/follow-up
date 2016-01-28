import React from 'react';
import { connect } from 'react-redux';
import { attemptUserLogin } from '../actions/user.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user.get('id')) {
      console.log(nextProps);
      this.history.pushState(null, '/people/');
    }
  }
  submitForm() {
    attemptUserLogin(this.refs.username.value, this.refs.password.value);
  }
  render() {
    return (
      <div className="login-box">
        <input type="text" name="username" placeholder="Username" ref="username" />
        <input type="password" name="password" placeholder="Password" ref="password" />
        <button onClick={this.submitForm}>Login</button>
      </div>
    );
  }
}

reactMixin.onClass(Login, History);

function selectUser(state) {
  return {
    user: state.user
  };
}

export default connect(selectUser)(Login);
