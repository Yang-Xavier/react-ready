import React from 'react';
import App from './App.jsx';

let ReactDOM = require('react-dom');

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {
  ReactDOM.render(<App style={{width: 100}}/>, document.getElementById('root'));
}

