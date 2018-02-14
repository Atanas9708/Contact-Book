import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Catalog from './components/Main/Catalog';
import Create from './components/Main/Create';
import { connect } from 'react-redux';
import { logoutAction } from './actions/authAction';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
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
    if (nextProps.loginSuccess) {
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
          <Route path='/create' component={Create} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapState(state) {
  return {
    loginSuccess: state.login.success
  };
}

function mapDispatch(dispatch) {
  return {
    logout: () => dispatch(logoutAction())
  };
}

export default withRouter(connect(mapState, mapDispatch)(App));
