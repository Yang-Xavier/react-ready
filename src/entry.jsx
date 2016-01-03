import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'

import App from './App.jsx'

injectTapEventPlugin()

var Main = React.createClass({
  render: function() {
    return (
      <IconMenu iconButtonElement={
        <IconButton tooltip={'menus list'} >
          <FontIcon className='material-icons' style={{color: '#ffffff'}} >more_vert</FontIcon>
        </IconButton> } >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

});

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {
  ReactDOM.render(<App style={{width: 100}}/>, document.getElementById('root'))
  //ReactDOM.render(<Main />, document.getElementById("container"));
}

