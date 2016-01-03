import React, { Component  } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import FontIcon from 'material-ui/lib/font-icon'
import FlatButton from 'material-ui/lib/flat-button'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuDivider from 'material-ui/lib/menus/menu-divider'
import IconButton from 'material-ui/lib/icon-button'
import MyTheme from './selfTheme.js'
import Colors from 'material-ui/lib/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


class HeadMenuListButton extends Component {
  
  constructor() {
    super()
  }

  render() {
    return (
      <IconMenu iconButtonElement={
        <IconButton tooltip={'menus list'} >
          <FontIcon className='material-icons' color={Colors.fullWhite} >more_vert</FontIcon>
        </IconButton> } >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuDivider />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }
}

export default class App extends Component {


  constructor() {
    super()
    this.state = {liked: false}
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme)
    }
  }

  handleClick(event){
    this.setState({liked: !this.state.liked})
  }

  render() {
    var like = this.state.liked ? 'like' : 'haven\'t liked'

    return (
      <div className='App' >
        <AppBar title='Expriment' 
                iconElementRight={<HeadMenuListButton />} 
        />
        <p>I {like} this button! </p>
        <input type='button' value='click me' onClick={this.handleClick.bind(this)} />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
}
