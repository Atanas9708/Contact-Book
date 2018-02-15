import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Details = ({ user }) => (
  <div id="details">
    <h1>Details</h1>
    <div className="content">
      {!user && <p>There are no contacts in the list at the moment.</p>}
      {user && (
        <div>
          <div className="info">
            <div className="col">
              <img className="avatar" src={user.image}/>
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
          <div class="controls">
            <ul>
              <li><Link className="edit" to={'/edit/' + user._id}>Edit</Link></li>
              <li><Link className="delete" to={'/delete/' + user._id}>Delete</Link></li>
            </ul>
          </div>

        </div>)}
    </div>
  </div>
);

export default Details;