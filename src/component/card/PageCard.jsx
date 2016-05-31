 /* This is a powerful page card, it may be the frame of a page
  *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from "react"
 
import getMuiTheme from "material-ui/styles/getMuiTheme"

import CommonImgCard from "./CommonCard.jsx"

import MyTheme from "../selfTheme.js"
import {onWindowResize} from "../lib/pageFun.js"
import {MergeObjects} from "../lib/util.js"


/* page card form , it has a beautiful theme
 *
 * 
 * @prop style Object the additional style for card
 * @prop title String the title of the Card
 * @prop subtitle String the Subtitle title of the Card
 * @prop img String_or_Object the src for img or the img data
 */
export default class PageCard extends Component {

  constructor(props){
    super(props)
  }

  getChildContext(){
    return {
      muiTheme: getMuiTheme(MyTheme)
    }
  }

  render() {

    let style = {
      width: "100%",
      height: "100%",
      margin: "0 0",
      padding: "0 0"
    }

    return (
      <div style={style}>
        <CommonImgCard {...this.props}/>
      </div>
    )
  }
}
PageCard.propTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  img: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ])
}
PageCard.defaultProps = {
  style: {}
}
PageCard.childContextTypes = {
  muiTheme: React.PropTypes.object
}

