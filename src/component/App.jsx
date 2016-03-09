import React, { Component  } from 'react'

import AppBar from 'material-ui/lib/app-bar'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import IconButton from 'material-ui/lib/icon-button'
import MyTheme from '../selfTheme.js'
import Colors from 'material-ui/lib/styles/colors'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'

import {CloseWindow, hashChange} from './lib/pageFun.js'


export default class App extends Component {
  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme)
    }
  }

  handleClose() {
    CloseWindow()
  }

  render() {

    return (
      <div className="body" >
        <AppBar title={this.props.title} 
          iconElementLeft={<IconButton onTouchTap={this.handleClose} ><NavigationClose /></IconButton>}
          iconElementRight={
            this.props.menuListButton
          }
        />
        {this.props.children}
      </div>
    )
  }
}
App.propTypes = {
  title: React.PropTypes.string,
  menuListButton: React.PropTypes.object.isRequired
}
App.defaultProps = {
  title: 'Title'
}
App.childContextTypes = {
  muiTheme: React.PropTypes.object,
}
