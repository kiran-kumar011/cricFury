import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/App';
import store from "./store";
import './scss/app.scss';



ReactDOM.render(
	<Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
 );