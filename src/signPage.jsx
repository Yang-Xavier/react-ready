/* The page of sign up info for participters
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
 
import Card from 'material-ui/lib/card/card'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import CardTitle from 'material-ui/lib/card/card-title'
import CardMedia from 'material-ui/lib/card/card-media'
import InfoDialog from './component/InfoDialog.jsx'
import Colors from 'material-ui/lib/styles/colors'

import MyTheme from './component/selfTheme.js'
import {CenterButtons} from './component/buttons/BetweenButtons.jsx'
import {LenCtlTextField, RegCtlTextField} from './component/textfield/InputContrlTextField.jsx'
import {onWindowResize, hashChange} from './component/lib/pageFun.js'
import {PostParticipator} from './component/lib/callToBack.js'

injectTapEventPlugin()

let headImage = require('./img/Head.jpg')


class SignPageCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      'disabled': false , //while touch down button , disable all button and textField
      'cardStyle': {},
      'imgStyle': {}
    }

    this.fields = {
      'Name': { 'isValid': 0, 'value': '', },
      'School': { 'isValid': 0, 'value': '', },
      'StudentNumber': { 'isValid': 0, 'value': '', },
      'Phone': { 'isValid': 0, 'value': '', },
      'QQ': { 'isValid': 0, 'value': '', },
      'Email': { 'isValid': 0, 'value': '', }
    }
    this._dialog = {}

    this.componentDidMount = this.componentDidMount.bind(this)
    this.callbacks = this.callbacks.bind(this)
    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme)
    }
  }

  callbacks(fieldname){
    return {
      'callback': (value) => {
        this.fields[fieldname] = {
          'isValid': 1,
          'value': value.trim()
        }
      },
      'errCallback': (value) => {
        this.fields[fieldname] = {
          'isValid': 0,
          'value': ''
        }
      }
    }  
  }

  componentDidMount(){
    onWindowResize((win) => {
      if(700 <= win.width && win.width < 800){
        this.setState({
          'cardStyle': { 'margin': '0 auto', 'width': '100%' },
          'imgStyle': {'display': 'block'}
        })
      }else if( 325 <= win.width && win.width < 700){
        this.setState({
          'cardStyle': { 'margin': '0 auto', 'width': '100%' },
          'imgStyle': {'display': 'none'}
        })
      }else if(win.width < 325){
        this.setState({
          'cardStyle': { 'margin': '0 auto', 'width': 325 },
          'imgStyle': {'display': 'none'}
        })
      }else{
        this.setState({
          'cardStyle': { 'margin': '100px auto', 'width': 800 },
          'imgStyle': {'display': 'block'}
        })
      }
    })
  }

  handleButtonTouchTap(){
    let fields = this.fields

    for(let key in fields){
      if(fields[key].isValid === 0){
        return;
      }
    }
    this.setState({
      'disabled': true
    })

    PostParticipator({
      'name': fields['Name'].value,
      'school': fields['School'].value,
      'sno': fields['StudentNumber'].value,
      'phone': fields['Phone'].value,
      'qq': fields['QQ'].value,
      'email': fields['Email'].value
    }, (err, data) => {
      this.setState({
        'disabled': false
      })
      
      if(data['status'] === 1)
        this._dialog.Open("Error", data.message)
      else if(err)
        this._dialog.Open("Error", err)
      else
        hashChange('success')
    })
  }
  
  render() {
    let okButton = { 'label': 'Sign Up', 'onTouchTap': this.handleButtonTouchTap, 'type': 1}
    let divStyle = { 'height': 82, 'padding': 4, 'margin': '0 auto'}
    let textField = { 'width': '100%' }

    return (
      <Card style={this.state['cardStyle']}>
        <CardTitle title="Sign Up!" subtitle="欢迎报名 杭电Hackathon !"/>
        <CardMedia >
            <img src={headImage} style={this.state['imgStyle']}/>
        </CardMedia>
        <InfoDialog ref={(c)=>{this._dialog = c}} contentStyle={this.state['cardStyle']}/>
        <div style={{padding: "16px", margin: "0 auto", width: "300px" }} >
          <div style={divStyle} key={1} >
            <LenCtlTextField hintText="Let's remember you!" floatingLabelText="Name"  minl={0} maxl={20}
              errString="Name is indispensable ! And Length of Name should be between 1 to 20 !" style={textField}
              {...this.callbacks('Name')} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={2} >
          <LenCtlTextField hintText="We believe your school is wonderful!" floatingLabelText="School" minl={1} maxl={20}
              errString="Length of your school name should be between 2 to 20" style={textField}
              {...this.callbacks('School')} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={3} >
            <RegCtlTextField hintText="If you have ..." floatingLabelText="StudentNumber" reg={/^[ \t\s]*[0-9]{0,30}[ \t\s]*$/}
              errString="StudentNumber should be a number string, and Length of it should be smaller than 30 !" style={textField}
              {...this.callbacks('StudentNumber')} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={4} >
            <RegCtlTextField hintText="We will not make nuisance calls." floatingLabelText="Phone" reg={/^[ \t\s]*[0-9]{11}[ \t\s]*$/}
              errString="Phone should be a number string, and Length of it should be 11 !" style={textField}
              {...this.callbacks('Phone')} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={5} >
            <RegCtlTextField hintText="Let's chat on-line!" floatingLabelText="QQ" reg={/^[ \t\s]*[0-9]{9,12}[ \t\s]*$/}
              errString="QQ should be a number string, and Length of it should be between 9 to 12 !" style={textField}
              {...this.callbacks('QQ')} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={6} >
            <RegCtlTextField hintText="This is the most important!" floatingLabelText="Email" reg={/^[ \t\s]*\w+(\.\w+)*@(\w+\.)+\w{2,3}[ \t\s]*$/}
              errString="Please input a right email" style={textField}
              {...this.callbacks('Email')} disabled={this.state.disabled}/>
          </div>
        </div>
        <div style={{padding: "16px", margin: "0 auto", width: 88}}>
          <CenterButtons buttons={[okButton]}  disabled={this.state.disabled}/>
        </div>
      </Card>
    )
  }
}
SignPageCard.propTypes = {style: React.PropTypes.object}
SignPageCard.defaultProps = {style: {}}
SignPageCard.childContextTypes = {
  muiTheme: React.PropTypes.object,
}


// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {

  ReactDOM.render(
    <SignPageCard />,
    document.getElementById('root'))
}

