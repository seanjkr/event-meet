import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.register();

reportWebVitals();

atatus.config('3d82766b4d004e2ca6da81106aaaf3fb').install();