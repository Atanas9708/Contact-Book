import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerAction, redirect } from './../../actions/authAction';

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
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="box">
        <h1>Register</h1>
        <div className="content">
          <form id="register-form" onSubmit={this.onSubmit}>
            <label htmlFor="newUsername">Username</label>
            <input onChange={this.onChange} name="username" value={this.state.username} id="newUsername" type="text" />
            <label htmlFor="newPassword">Password</label>
            <input onChange={this.onChange} name="password" value={this.state.password} id="newPassword" type="password" />
            <label htmlFor="newPassRep">Repeat Password</label>
            <input onChange={this.onChange} name="repeatPass" value={this.state.repeatPass} id="newPassRep" type="password" />
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    registerSuccess: state.register.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (username, password) => dispatch(registerAction(username, password)),
    redirect: () => dispatch(redirect())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));