import React, { Component  } from 'react'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import TextField from 'material-ui/lib/text-field'

import InfoDialog from './InfoDialog.jsx'
import BetweenButtons from './BetweenButtons.jsx'

import {hashChange, parseParams, uriChange} from './lib/pageFun.js'
import {Check_username, Check_password} from './lib/inputCheck.js'
import {UserChangePassword} from './lib/callToBack.js'


export default class ChangePasswordCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {'loading': 0} //1 is loading

    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this)
    this.handlePasswordAgainOnChange = this.handlePasswordAgainOnChange.bind(this)

    this.password = {
      isValid: false,
      value: ''
    }
  }

  handleButtonTouchTap() {
    if(!this.state.loading && this.password.isValid){
      this.setState({'loading': 1})

      UserChangePassword(this.password.value, (err, data) => {
        if(err){
          this._dialog.Open('Error',err.toString())
        }else if(data['status']){
          this._dialog.Open('Error',data['message'])
        }else{
          this._password.setValue('')
          this._password_again.setValue('')
          this._dialog.Open('Info', 'Congratulation! You have changed your password')
        }

        this.setState({'loading': 0})
      })
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
    let changePasswordButton =  {'label': 'Ok', 'onTouchTap': this.handleButtonTouchTap, 'type': 1}
    let backButton = { 'label': 'back', 'onTouchTap': () => {hashChange('')}, 'type': 2}

    if(this.state.loading){
      changePasswordButton.disabled = 1
    }

    return (
      <Card style={this.props.style}>
        <InfoDialog ref={(c)=>{this._dialog = c}}/>
        <CardTitle title="Change Password" subtitle="change your password to be new"/>
        <div style={{padding: "16px", margin: "0 0", width: "100%" }} >
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="New Password" type="password" 
           ref={(c)=>{this._password = c}} onChange={this.handlePasswordOnChange}
           />
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="New Password Again" type="password" 
           ref={(c)=>{this._password_again = c}} onChange={this.handlePasswordAgainOnChange}
           />
        </div>
        <BetweenButtons buttons={[changePasswordButton, backButton]} style={{padding: "16px", margin: "0 0"}}/>
      </Card>
    )
  }
}
ChangePasswordCard.propTypes = {style: React.PropTypes.object}
ChangePasswordCard.defaultProps = {style: {}}
