import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'

import App from './component/App.jsx'
import HeadMenuListButton from './component/HeadMenuListButton.jsx'

injectTapEventPlugin()

let menuList = [
  {'pkey': 'students', 'hash': 'students'},
  {'pkey': 'courses', 'hash': 'courses'},
  {'pkey': '-'},
  {'pkey': 'change password', 'hash': 'change_password'},
  {'pkey': '-'},
  {'pkey':'Help', 'hash': 'help'},
]

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {
  ReactDOM.render(<App style={{width: 100}} menuListButton={<HeadMenuListButton itemList={menuList}/>} />, 
                  document.getElementById('root'))
  //ReactDOM.render(<Main />, document.getElementById("container"));
}

