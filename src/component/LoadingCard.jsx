import React, { Component  } from 'react'

import CircularProgress from 'material-ui/lib/circular-progress'
import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'

class Loading extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    let LoadingStyle = {
      margin: "auto auto",
      width: 50+10*2+17.5*this.props.size*2,
      height: 50+10*2+17.5*this.props.size*2
    }
    let PlaneStyle = this.props.style ? this.props.style : {};

    return (
      <div className="Plane" style={PlaneStyle}>
        <div className="Loading" style={LoadingStyle} >
          <CircularProgress mode="indeterminate" size={this.props.size} value={this.props.value}/> 
        </div>
      </div>
    )
  }
}
Loading.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.number,
  value: React.PropTypes.number
}
Loading.defaultProps = {
  style: {},
  size: 1.7,
  value: 60
}


export default class LoadingCard extends Component {
  
  constructor(props) {
    super(props)
    this.minHeight = 400
    this.style = {}
  }

  render() {
    let children = null 
    let style = this.style
    style.minHeight = this.minHeight+'px'

    for(let key in this.props.style){
      style[key] = this.props.style[key]
    }

    if(this.props.isloading){
      children = <Loading style={{margin: '50px'}}/>
    }else{
      children = this.props.children
    }

    return (
      <Card style={style} >
        <CardTitle title={this.props.cardTitle}/>
        {children}
      </Card>
    )
  }
}
LoadingCard.propTypes = {
  //headColumns is the name of the Columns , but rowColumns is the key name of the Column element
  cardTitle: React.PropTypes.string,
  isloading: React.PropTypes.bool,
}
LoadingCard.defaultProps = {
  style: {},
  cardTitle: 'Title',
  isloading: true
}



