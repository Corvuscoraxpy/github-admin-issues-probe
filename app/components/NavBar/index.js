import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Drawer from 'material-ui/Drawer';
import RepoLabels from 'containers/RepoLabels';
import RepoLoader from 'containers/RepoLoader';
import { colorLuminance } from '../../api/format.js';
import githubImage from 'assets/images/github.png';
import styles from './styles.css';


const customContentStyle = {
    width: '340px',
    maxWidth: 'none',
    textAlign: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch'
};

const { bool, func, object, arrayOf, number } = PropTypes;
const propTypes = {
    userData: object.isRequired,
    issuesUpdatingList: arrayOf(number).isRequired,
    updateInProcess: bool.isRequired,
    signStatus: bool.isRequired,
    onSignIn: func.isRequired,
    onSignOut: func.isRequired,
};

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: !this.props.signStatus,
            errorMessage: 'For unlimited queries',
            openDrawer: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: !nextProps.signStatus,
            errorMessage: 'For unlimited queries',
        });
    }

    render() {
        const errorStyle = {
            errorMessage: {
                color: this.state.errorMessage === 'For unlimited queries'
                    ? '#c0c0c0'
                    : '#e74c3c',
                marginTop: '50px',
            },
        };

        const actions = [
            <FlatButton
                label="Sign in"
                hoverColor={colorLuminance('#173e43', 0.2)}
                style={{color: '#FFF'}}
                rippleColor={'#fae596'}
                backgroundColor={'#173e43'}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSignIn}
            />,
        ];
        const { userData, updateInProcess, issuesUpdatingList } = this.props;
        return (
            <div>
                <AppBar
                    style={{backgroundColor: '#173e43'}}
                    showMenuIconButton={true}
                    title={
                        <span>
                            {(Object.keys(userData).length !== 0)
                                ?   userData.login
                                :   "Issues Probe Application"
                            }
                        </span>
                    }
                    iconElementRight={
                        <FlatButton
                            label="Sign out"
                            hoverColor={colorLuminance('#173e43', 0.2)}
                            style={{color: '#FFF'}}
                            rippleColor={'#fae596'}
                            backgroundColor={'#173e43'}
                            onClick={this.handleSignOut}
                        />
                    }
                    onLeftIconButtonTouchTap={this.handleToggle}
                >
                    <a href="https://github.com/proficiat/github-admin-issues-probe" target="_blank">
                        <RefreshIndicator
                            status={
                                updateInProcess || (issuesUpdatingList && issuesUpdatingList.length > 0)
                                    ?   "loading"
                                    :   "ready"
                            }
                            size={40}
                            left={-20}
                            top={0}
                            zDepth={0}
                            loadingColor={"#FFFFFF"}
                            style={{
                                marginLeft: '50%',
                                marginTop: '.8em',
                                backgroundColor: '#173e43',
                                background:
                                    updateInProcess || (issuesUpdatingList && issuesUpdatingList.length > 0)
                                    ?   'none'
                                    :   `url(${githubImage}) center/20px 20px no-repeat`
                                ,
                                boxShadow: 'none'
                            }}
                        />
                    </a>
                </AppBar>

                <Dialog
                    title="Sign in to GitHub"
                    titleStyle={{backgroundColor: '#173e43', color: '#FFF' }}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    onRequestClose={this.handleClose}
                >
                    <br/>
                    <span style={errorStyle.errorMessage}>
                        {this.state.errorMessage}
                    </span>
                    <TextField
                        hintText="username"
                        floatingLabelText="Enter your username"
                        floatingLabelStyle={{color: '#3fb0ac'}}
                        underlineStyle={{borderColor: '#173e43'}}
                        underlineFocusStyle={{borderColor: '#173e43' }}
                        ref={me => this.usernameField = me}
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Enter your password"
                        floatingLabelStyle={{color: '#3fb0ac'}}
                        underlineStyle={{borderColor: '#173e43'}}
                        underlineFocusStyle={{borderColor: '#173e43' }}
                        type="password"
                        ref={me => this.passwordField = me}
                    />
                </Dialog>

                <Drawer
                    docked={false}
                    width={444}
                    open={this.state.openDrawer}
                    onRequestChange={(open) => this.setState({openDrawer: false})}
                >
                    <RepoLoader />
                    <RepoLabels />
                </Drawer>
            </div>
        );
    }

    handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

    handleSignOut = () => {
        const { onSignOut } = this.props;
        onSignOut();
    }

    handleSignIn = () => {
        const { onSignIn } = this.props;
        const { errorMessage, open } = this.state;
        const username = this.usernameField.getValue();
        const password = this.passwordField.getValue();

        onSignIn(username, password)
            .catch (err => this.setState({errorMessage: err.message}));
    }
}


NavBar.propTypes = propTypes;

export default NavBar;
