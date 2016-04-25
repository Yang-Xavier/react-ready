import React, { Component  } from 'react'

import FontIcon from 'material-ui/lib/font-icon'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import {CloseWindow, hashChange} from '../lib/pageFun.js'


/* This function create the menu list according to the itemList
 *
 * items : {pkey: string , hash: string} 
 *        or {pkey: '-'} 
 *        or {pkey: string , hash: string, click: func} 
 * 
 * @param itemList Array<object> the array of item
 * @param itemClickCb Function() item click call back, call it after the item clicked
 *
 * @return menuList Array<react element>
 */
export default function CreateMenuList(itemList, itemClickCb=()=>{}){

    let menuList = itemList.map((elf) => {
      let componentName = MenuItem
      let componentProp = {}

      if(elf.pkey === '-'){
        componentName = Divider
      }else{
        componentProp['primaryText'] = elf['pkey']

        if(elf['click'] !== undefined && typeof elf['click'] === 'function'){
          componentProp['onTouchTap'] = () => {elf['click'](); itemClickCb()} 
        }else{
          componentProp['onTouchTap'] = () => {hashChange(elf['hash']); itemClickCb()} 
        }
      }

      return React.createElement(componentName, componentProp)
    })
    menuList.push(<MenuItem primaryText='Close' onTouchTap={() => CloseWindow()} />)

    return menuList
}

export class HeadMenuListButton extends Component {
  
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <IconMenu iconButtonElement={
        <IconButton tooltip='menus list' >
          <FontIcon className='material-icons' color={Colors.fullWhite} >more_vert</FontIcon>
        </IconButton> } >
        {CreateMenuList(this.props.itemList)}
      </IconMenu>
    )
  }
}
HeadMenuListButton.propTypes = {
  itemList: React.PropTypes.array.isRequired,
}

