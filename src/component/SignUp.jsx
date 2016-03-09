import React, { Component  } from 'react'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import TextField from 'material-ui/lib/text-field'

import InfoDialog from './InfoDialog.jsx'
import BetweenButtons from './BetweenButtons.jsx'

import {hashChange, parseParams, uriChange} from './lib/pageFun.js'
import {Check_username, Check_password} from './lib/inputCheck.js'
import {UserSignUp} from './lib/callToBack.js'


export default class SignUpCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {'loading': 0} //1 is loading

    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this)
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this)
    this.handlePasswordAgainOnChange = this.handlePasswordAgainOnChange.bind(this)

    this.username = {
      isValid: false,
      value: '',
    }
    this.password = {
      isValid: false,
      value: ''
    }
  }

  handleButtonTouchTap() {
    if(!this.state.loading && this.username.isValid && this.password.isValid){

      this.setState({'loading': 1})

      UserSignUp(this.username.value, this.password.value, (err, data) => {
        if(err){
          this._dialog.Open('Error',err.toString())
        }else if(data['status']){
          this._dialog.Open('Error',data['message'])
        }else{
          let params = parseParams(window.location.search)

          if(params.next === undefined){
            uriChange('/')
          }else{
            uriChange(params.next)
          }
        }

        this.setState({'loading': 0})
      })
    }
  }

  handleUsernameOnChange(){
    if(this._username === undefined) return

    let username = this._username.getValue()
    let check_result = Check_username(username)

    if(! check_result.isValid){
      this._username.setErrorText(check_result.error)
      this.username.isValid = false
    }else{
      this._username.setErrorText('')
      this.username.isValid = true
      this.username.value = username
    }
  }

  handlePasswordOnChange(){
    if(this._password === undefined) return

    let password = this._password.getValue()
    let check_result = Check_password(password)

    if(! check_result.isValid){
      this._password.setErrorText(check_result.error)
      this.password.isValid = false
    }else{
      this._password.setErrorText('')
      this.password.value = password
      this.handlePasswordAgainOnChange()
    }
  }

  handlePasswordAgainOnChange() {
    if(this._password_again === undefined) return
    
    let password = this._password_again.getValue()

    if(password !== this.password.value){
      this._password_again.setErrorText("Two password is different !")
      this.password.isValid = false
    }else{
      this._password_again.setErrorText('')
      this.password.isValid = true
    }
  }

  render() {
    let signUpButton =  {'label': 'To Sign Up', 'onTouchTap': this.handleButtonTouchTap, 'type': 1}
    let loginButton = { 'label': 'Login', 'onTouchTap': () => {hashChange('signup')}, 'type': 2}
    let loading

    if(this.state.loading){
      signUpButton.disabled = 1
    }

    return (
      <Card style={this.props.style}>
        <InfoDialog ref={(c)=>{this._dialog = c}}/>
        <CardTitle title="Sign Up" subtitle="Register a account for yourself"/>
        <div style={{padding: "16px", margin: "0 0", width: "100%" }} >
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="Username" type="text" 
           ref={(c)=>{this._username = c}} onChange={this.handleUsernameOnChange}
           />
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="Password" type="password" 
           ref={(c)=>{this._password = c}} onChange={this.handlePasswordOnChange}
           />
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="Password Again" type="password" 
           ref={(c)=>{this._password_again = c}} onChange={this.handlePasswordAgainOnChange}
           />
        </div>
        <BetweenButtons buttons={[signUpButton, loginButton]} style={{padding: "16px", margin: "0 0"}}/>
      </Card>
    )
  }
}
SignUpCard.propTypes = {style: React.PropTypes.object}
SignUpCard.defaultProps = {style: {}}
