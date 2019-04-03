import React, {Component}                              from 'react';
import {Provider}                                      from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk                                           from 'redux-thunk';
import {reducers}                                      from 'rdx';
import AppContainer                                    from 'containers/App';
import {Router}                                        from "react-router";
import {createBrowserHistory}                          from "history";

import './styles/index.scss';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  combineReducers({...reducers}),
  applyMiddleware(thunk)
);
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <AppContainer/>
        </Router>
      </Provider>
    );
  }
}

export default App;
