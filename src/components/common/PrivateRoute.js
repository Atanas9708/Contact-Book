import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    if (localStorage.getItem('authtoken') === null) {
      return <Redirect to="/login" />;
    };

    return (
      <Route {...this.props} />
    );
  }
}

export default PrivateRoute;