import React from 'react';
import App from './App.jsx';
import AppBar from 'material-ui/lib/app-bar';

let materil_css = require('./materil.css');

let ReactDOM = require('react-dom');

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {
  ReactDOM.render(<App />, document.getElementById('root'));
  ReactDOM.render(<AppBar title="Title" />, document.getElementById('bar'));
}

