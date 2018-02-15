import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/site.css';
import './style/contacts.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer';
import { fetchContactsAction } from './actions/contactAction';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));

store.dispatch(fetchContactsAction());

// store.subscribe(() => console.log(store.getState()));

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
