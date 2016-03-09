import React, { Component  } from 'react'

import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

export default class InfoDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {'open': false}

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)

    this.title = 'info'
    this.info = 'info'
  }

  Open(title, info) {
    this.title = title
    this.info = info
    this.handleDialogOpen()
  }

  handleDialogOpen() {
    this.setState({'open': true})
  }

  handleDialogClose() {
    this.setState({'open': false})
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} keyboardFocused={true} onTouchTap={this.handleDialogClose} />
    ]

    return (
      <Dialog 
        title={this.title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleDialogClose}>
        {this.info}
      </Dialog>
    )
  }
}
InfoDialog.propTypes = {
  anotherButton: React.PropTypes.object
}
InfoDialog.defaultProps = {
}
