import React, { Component } from 'react';
import Preloader from './../common/Preloader';
import { connect } from 'react-redux';
import { loginAction, redirect } from './../../actions/authAction';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSuccess) {
      this.props.redirect();
      toastr.success('Loggin successful!');
      this.props.history.push('/');
    } else if (nextProps.error) {
      toastr.error(nextProps.error);
    }
  }

  render() {
    let { loading } = this.props;

    return (
      <div className="box">
        {loading && <Preloader />}
        {!loading &&
          <div className="content">
            <h1>Sign in</h1>
            <form onSubmit={this.onSubmit} id="login-form">
              <label htmlFor="username">Username</label>
              <input onChange={this.onChange} name="username" value={this.state.username} id="username" type="text" />
              <label htmlFor="password">Password</label>
              <input onChange={this.onChange} name="password" value={this.state.password} id="password" type="password" />
              <input type="submit" value="Login" />
            </form>
          </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loginSuccess: state.login.success,
    error: state.login.errors,
    loading: state.login.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
    redirect: () => dispatch(redirect())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));