import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createAction } from './../../actions/contactAction';
import { connect } from 'react-redux';
import toastr from 'toastr';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    let payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      image: this.state.image,
      email: this.state.email,
      phone: this.state.phone,
      creator: localStorage.getItem('creator')
    };

    // if (!playload.firstName !== undefined || !payload.firstName !== null || !payload.firstName.length < 5) {

    // }

    this.props.create(payload).then(() => {
      toastr.success('Contact added successfully!');
      this.props.history.push('/');
    })
  }


  render() {
    return (
      <div className="box">
        <h1>Create</h1>
        <div className="content">
          <form id="register-form" onSubmit={this.onSubmit}>
            <label htmlFor="newUsername">First Name</label>
            <input onChange={this.onChange} name="firstName" value={this.state.firstName} id="firstName" type="text" />
            <label htmlFor="newPassword">Last Name</label>
            <input onChange={this.onChange} name="lastName" value={this.state.lastName} id="lastName" type="text" />
            <label htmlFor="newPassRep">Profile Picture</label>
            <input onChange={this.onChange} name="image" value={this.state.image} id="image" type="text" />
            <label htmlFor="newPassRep">Email</label>
            <input onChange={this.onChange} name="email" value={this.state.email} id="email" type="text" />
            <label htmlFor="newPassRep">Phone Number</label>
            <input onChange={this.onChange} name="phone" value={this.state.phone} id="phone" type="number" />
            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    create: (payload) => dispatch(createAction(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create));