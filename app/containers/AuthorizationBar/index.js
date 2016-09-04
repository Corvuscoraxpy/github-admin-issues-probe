import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getUserName, getUserData, getUserSignStatus } from './selectors';
import NavBar from 'components/NavBar';


class AuthorizationBar extends Component {

    render() {
        const { userData, signStatus } = this.props;
        return (
            <NavBar
                userData={userData}
                signStatus={signStatus}
                onSignIn={this.handleSignIn}
                onSignOut={this.handleSignOut}
            />
        );
    }

    handleSignIn = (username, password) => {
        const { onSignInAction } = this.props;
        return onSignInAction(username, password);

    }

    handleSignOut = () => {
        const { signOutAction } = this.props;
        signOutAction();
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    username: getUserName(),
    userData: getUserData(),
    signStatus: getUserSignStatus(),
});

AuthorizationBar.defaultProps = {
    userData: {},
    username: '',
    signStatus: false
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationBar);
