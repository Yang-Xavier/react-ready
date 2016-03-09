import React, { Component  } from 'react'

import RaisedButton from 'material-ui/lib/raised-button'

function suitRaisedButton(elf){
  let props = {onTouchTap: elf.onTouchTap}
  let children = []

  switch(elf.type){
    case 1: props.primary = true;break
    case 2: props.secondary = true;break
    default:
  }

  if(elf.disabled){
    props.disabled = true
  }

  if(typeof elf.label === 'string'){
    props.label = elf.label
  }else{
    children.push(elf.label)
  }

  return React.createElement(RaisedButton, props, ...children)
}

export class CenterButtons extends Component {
  
  constructor(props) {
    super(props)

    this.mainStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
    }
  }

  render() {
    for(let key in this.props.style){
      this.mainStyle[key] = this.props.style[key]
    }

    let inlineButtons = this.props.buttons.map(suitRaisedButton)

    return (
      <div style={this.mainStyle} >
        {inlineButtons}
      </div>
    )
  }
}
CenterButtons.propTypes = {
  style: React.PropTypes.object,
  //button formate: [{'label': string, 'onTouchTap': function, 'disabled': 1 ,'type': 0,1,2}, ...]
  //1: primary , 2: secondary, 0: default
  buttons: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
CenterButtons.defaultProps = {style: {}}

export default class BetweenButtons extends Component {
  
  constructor(props) {
    super(props)

    this.mainStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center',
    }
  }

  render() {
    for(let key in this.props.style){
      this.mainStyle[key] = this.props.style[key]
    }

    let inlineButtons = this.props.buttons.map(suitRaisedButton)

    return (
      <div style={this.mainStyle} >
        {inlineButtons}
      </div>
    )
  }
}
BetweenButtons.propTypes = {
  style: React.PropTypes.object,
  //button formate: [{'label': string, 'onTouchTap': function, 'disabled': 1 ,'type': 0,1,2}, ...]
  //1: primary , 2: secondary, 0: default
  buttons: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
BetweenButtons.defaultProps = {style: {}}
