import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createHistory from 'history/createHashHistory'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';

const logger = createLogger();
const store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, logger)
);
const history = createHistory();
ReactDOM.render(
  <div id="index">  
    <Provider store={store} history={history}>
        <App history={history}/>
    </Provider>
  </div>
  ,
  document.getElementById('root')
);
