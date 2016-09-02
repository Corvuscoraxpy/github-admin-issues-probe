import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

export default class NewIssue extends Component {


  render() {
    return (
      <div>
        <Dialog
          title="Sign in to GitHub"
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={customContentStyle}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="title"
            floatingLabelText="Enter title"
            ref={me => this.titleField = me}
          />
          <br/>
          <TextField
            hintText="Comment"
            floatingLabelText="Leave a comment"
            ref={me => this.commentField = me}
          />
        </Dialog>
      </div>
    );
  }
}
