import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, IndexRoute, Redirect} from 'react-router'

import App from './App.jsx'
import LoginCard from './Login.jsx'
import SignUpCard from './SignUp.jsx'
import HelpCard from './Help.jsx'
import HeadMenuListButton from './HeadMenuListButton.jsx'

injectTapEventPlugin()

let menuList = [
  {'pkey': 'Login', 'hash': 'login'},
  {'pkey':'Sign Up', 'hash': 'signup'},
  {'pkey': '-'},
  {'pkey':'Help', 'hash': 'help'},
]

let loadingStyle = {
  width: "80%",
  height: "100%",
  margin: "0 auto",
  padding: "100px 0"
}

let CardStyle = {
  width: 500,
  height: "100%",
  margin: "50px auto"
}

// a glue fucntion to glue django template and React.
window.ReactInit = function glue(params) {
  let __App = (props) => <App {...props} title={params.title} menuListButton={<HeadMenuListButton itemList={menuList}/> }/>
  let __LoginCard = (props) => <LoginCard {...props} style={CardStyle}/>
  let __SignUpCard = (props) => <SignUpCard {...props} style={CardStyle}/>
  let __HelpCard = (props) => <HelpCard {...props} style={CardStyle} />

  ReactDOM.render(
    <Router>
      <Route path="/"  component={__App} >
        <Redirect from="login" to="/" /> 
        <IndexRoute component={__LoginCard} />
        <Route path="signup" component={__SignUpCard} />
        <Route path="help" component={__HelpCard} />
      </Route>
    </Router>,
    document.getElementById('root'))
}

