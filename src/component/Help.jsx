import React, { Component  } from 'react'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import TextField from 'material-ui/lib/text-field'
import CardText from 'material-ui/lib/card/card-text'
import RaisedButton from 'material-ui/lib/raised-button'

import {hashChange} from './lib/pageFun.js'


export default class HelpCard extends Component {
  
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Card style={this.props.style}>
        <CardTitle title="Help" subtitle="The help card!"/>
        <CardText >
          Help by yourself!
        </CardText >
        <div style={{margin: "0 auto", padding:"16px", width:100}} >
          <RaisedButton label="Return" primary={true} onTouchTap={()=> hashChange('login')} />         
        </div>
      </Card>
    )
  }
}
HelpCard.propTypes = {style: React.PropTypes.object}
HelpCard.defaultProps = {style: {}}
