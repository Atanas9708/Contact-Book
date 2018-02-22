import React, { Component } from 'react';
import Preloader from './../common/Preloader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerAction, redirect, clearErrors } from './../../actions/authAction';
import toastr from 'toastr';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repeatPass: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.repeatPass) {
      this.props.register(this.state.username, this.state.password);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registerSuccess) {
      this.props.redirect();
      toastr.success('Registration successful!');
      this.props.history.push('/');
    } else if (nextProps.error) {
      toastr.error(nextProps.error);
      this.props.clear();
    }
  }

  render() {
    let { loading } = this.props;

    return (
      <div className="box">
        {loading && <Preloader />}
        {!loading &&
          <div className="content">
            <h1>Register</h1>
            <form id="register-form" onSubmit={this.onSubmit}>
              <label htmlFor="newUsername">Username</label>
              <input onChange={this.onChange} name="username" value={this.state.username} id="newUsername" type="text" />
              <label htmlFor="newPassword">Password</label>
              <input onChange={this.onChange} name="password" value={this.state.password} id="newPassword" type="password" />
              <label htmlFor="newPassRep">Repeat Password</label>
              <input onChange={this.onChange} name="repeatPass" value={this.state.repeatPass} id="newPassRep" type="password" />
              <input type="submit" value="Register" />
            </form>
          </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    registerSuccess: state.register.success,
    error: state.register.errors,
    loading: state.register.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (username, password) => dispatch(registerAction(username, password)),
    redirect: () => dispatch(redirect()),
    clear: () => dispatch(clearErrors())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));