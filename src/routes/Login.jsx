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
  componentDidMount() {
    this.refs.username.focus();
  }
  submitForm() {
    attemptUserLogin(this.refs.username.value, this.refs.password.value);
  }
  render() {
    return (
      <div className="login-box">
        <label className="login-box-username">
          <i className="fa fa-user" />
          <input type="text" name="username" placeholder="Email" ref="username" />
        </label>
        <label className="login-box-password">
          <i className="fa fa-key" />
          <input type="password" name="password" placeholder="Password" ref="password" />
        </label>
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
