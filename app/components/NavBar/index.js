import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import { deepOrange300, pink400 } from 'material-ui/styles/colors';

const customContentStyle = {
  width: '340px',
  maxWidth: 'none',
  textAlign: 'center',
  alignItems: 'stretch',
  alignSelf: 'stretch'
};

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: !this.props.signed,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: !nextProps.signed})
  }

  handleLoginClick = () => {
    const { onSignOutAction } = this.props;
    onSignOutAction();
  }

  handleClose = () => {
    const { onSignIn } = this.props;
    const username = this.usernameField.getValue();
    const password = this.passwordField.getValue();
    onSignIn(username, password);
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer'
      },
    };

    const actions = [
      <FlatButton
        label="Sign in"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const { userData } = this.props;
    return (
      <div>
        <AppBar
          showMenuIconButton={true}
          title={
            <span style={styles.title}>
              {(Object.keys(userData).length !== 0) ?
              userData.login : "Issues Probe Application"}
            </span>}
          zDepth={2}
          //onTitleTouchTap={handleTouchTap}
          //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={
            <FlatButton
              label="Sign out"
              onClick={this.handleLoginClick}
            />
          }
          iconElementLeft={
            <Avatar src={userData.avatar_url}/>
          }
        >
        </AppBar>
        <Dialog
          title="Sign in to GitHub"
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={customContentStyle}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="username"
            floatingLabelText="Enter your username"
            ref={me => this.usernameField = me}
          />
          <br/>
          <TextField
            hintText="Password"
            floatingLabelText="Enter your password"
            type="password"
            ref={me => this.passwordField = me}
          />
        </Dialog>
      </div>
    );
  }
}

NavBar.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignOutAction: PropTypes.func.isRequired,
  signed: PropTypes.bool.isRequired,
  //open: PropTypes.bool.isRequired,
}
