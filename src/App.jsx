import React, { Component  } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import FontIcon from 'material-ui/lib/font-icon'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import MyTheme from './selfTheme.js'

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
    var like = this.state.liked ? "like" : "haven't liked"

    return (
      <div className="App" >
        <AppBar title="Expriment" 
                iconElementRight={<FontIcon className="material-icons" style={{color: "#ffffff"}}>flight_takeoff</FontIcon>} 
        />
        <p>I {like} this button! </p>
        <input type="button" value="click me" onClick={this.handleClick.bind(this)} />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
}
