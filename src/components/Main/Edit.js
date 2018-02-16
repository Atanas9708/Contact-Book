import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { editAction } from './../../actions/contactAction';
import { connect } from 'react-redux';
import toastr from 'toastr';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      image: '',
      email: '',
      phone: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const contactId = this.props.match.params.id;
    let contact = this.props.contacts.filter(c => c._id === contactId)[0];
    this.setState({
      firstName: contact.firstName,
      lastName: contact.lastName,
      image: contact.image,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const contactId = this.props.match.params.id;
    let payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      image: this.state.image,
      email: this.state.email,
      phone: this.state.phone
    };

    this.props.edit(contactId, payload).then(() => {
      toastr.success('Contact edited successfully!');
      this.props.history.push('/');
    });
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="box">
        <h1>Edit</h1>
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
            <input type="submit" value="Edit" />
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    edit: (contactId, payload) => dispatch(editAction(contactId, payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit));