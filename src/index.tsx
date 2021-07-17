import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';

import App from './App';
import { store } from './store';

import awsconfig from "./aws-exports";
import './index.css';

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
