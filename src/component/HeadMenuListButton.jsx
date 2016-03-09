import React, { Component  } from 'react'

import FontIcon from 'material-ui/lib/font-icon'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuDivider from 'material-ui/lib/menus/menu-divider'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import {CloseWindow, hashChange} from './lib/pageFun.js'


export default class HeadMenuListButton extends Component {
  
  constructor(props) {
    super(props)
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleTouchTap(hash) {
    return () => {
      hashChange(hash)
    }
  }

  handleClose() {
    CloseWindow()
  }

  render() {
    //items : {pkey: string , hash: string} 
    //        or {pkey: '-'} 
    //        or {pkey: string , hash: string, click: func} 
    let MenuItemList = this.props.itemList.map((elf) => {
      let componentName = MenuItem
      let componentProp = {}

      if(elf.pkey === '-'){
        componentName = MenuDivider
      }else{
        componentProp['primaryText'] = elf['pkey']

        if(elf['click'] !== undefined && typeof elf['click'] === 'function'){
          componentProp['onTouchTap'] = elf['click']
        }else{
          componentProp['onTouchTap'] = this.handleTouchTap(elf['hash'])
        }

      }

      return React.createElement(componentName, componentProp)
    })

    return (
      <IconMenu iconButtonElement={
        <IconButton tooltip='menus list' >
          <FontIcon className='material-icons' color={Colors.fullWhite} >more_vert</FontIcon>
        </IconButton> } >
        {MenuItemList}
        <MenuItem primaryText='Close' onTouchTap={this.handleClose} />
      </IconMenu>
    )
  }
}
HeadMenuListButton.propTypes = {
  itemList: React.PropTypes.array.isRequired,
}

