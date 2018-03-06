import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Catalog from './components/Main/Catalog';
import Create from './components/Main/Create';
import Edit from './components/Main/Edit';
import Mine from './components/Main/Mine';
import PrivateRoute from './components/common/PrivateRoute';
import NotFound from './components/common/NotFound';
import { connect } from 'react-redux';
import { logoutAction } from './actions/authAction';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
      loading: false
    };

    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.setState({ isLogged: false });
    this.props.logout();
    this.props.history.push('/login');
  }

  componentWillMount() {
    if (localStorage.authtoken) {
      this.setState({ isLogged: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSuccess || nextProps.registerSuccess) {
      this.setState({ isLogged: true });
    }
  }

  render() {
    return (
      <div className="container">
        <Header
          isLogged={this.state.isLogged}
          logout={this.logout} />
        <Switch>
          <Route exact path='/' component={Catalog} />
          <PrivateRoute path='/create' component={Create} />
          <PrivateRoute path='/edit/:id' component={Edit} />
          <PrivateRoute path='/myContacts' component={Mine} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/catalog' component={Catalog} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapState(state) {
  return {
    loginSuccess: state.login.success,
    registerSuccess: state.register.success
  };
}

function mapDispatch(dispatch) {
  return {
    logout: () => dispatch(logoutAction())
  };
}

export default withRouter(connect(mapState, mapDispatch)(App));
