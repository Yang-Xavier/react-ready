/* the page manager 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
 
import RootLoginBlock from './component/RootLogin.jsx'

injectTapEventPlugin()



// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {

  let __RootLoginBlock = (props) => <RootLoginBlock {...props} />

  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/"  component={__RootLoginBlock} />
    </Router>,
    document.getElementById('root'))
}
