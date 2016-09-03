import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getUserName, getUserData, getUserSignStatus } from './selectors';
import NavBar from 'components/NavBar';
let api = require("../../api/restUtilities.js");

class AuthorizationBar extends Component {

  onSignIn = (username, password) => {
    api.fetchAuthorization(username, password)
    .then( res => {
        const { signInAction } = this.props;
        signInAction(username, password, res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <NavBar
        onSignIn={this.onSignIn}
        userData={this.props.userData}
        signed={this.props.signed}
        onSignOutAction={this.props.signOutAction}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  userData: getUserData(),
  signed: getUserSignStatus(),
});

AuthorizationBar.defaultProps = {
    userData: {},
    username: '',
    signed: false
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationBar);
