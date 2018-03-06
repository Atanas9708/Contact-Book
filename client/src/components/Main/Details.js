import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAction } from './../../actions/contactAction';
import toastr from 'toastr';

class Details extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
  }


  deleteUser = () => {
    const contactId = this.props.user._id;
    const userId = localStorage.getItem('userId');
    if (userId === this.props.user.creator) {
      this.props.deleteContact(contactId, userId);
      toastr.success('Contact deleted successfully!');
    }
  }

  render() {
    const { user } = this.props;
    let isAuthor = false;
    if (localStorage.getItem('userId') && user) {
      isAuthor = localStorage.getItem('userId') === user['creator'];
    }

    return (
      <div id="details">
        <h1>Details</h1>
        <div className="content">
          {!user && <p>There are no contacts in the list at the moment.</p>}
          {user && (
            <div>
              <div className="info">
                <div className="col">
                  <img className="avatar" src={user.image} />
                </div>
                <div className="col">
                  <span className="name">{user.firstName}</span>
                  <span className="name">{user.lastName}</span>
                </div>
              </div>
              <div className="info">
                <span className="info-line">&#9742; {user.phone}</span>
                <span className="info-line">&#9993; {user.email}</span>
              </div>
              {isAuthor &&
                <div className="controls">
                  <ul>
                    <li><Link className="edit" to={'/edit/' + user._id}>Edit</Link></li>
                    <li><a className="delete" href="javascript:void(0)" onClick={this.deleteUser}>Delete</a></li>
                  </ul>
                </div>
              }
            </div>)}
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
    deleteContact: (contactId, userId) => dispatch(deleteAction(contactId, userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details));