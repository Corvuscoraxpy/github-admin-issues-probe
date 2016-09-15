import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RepoLabels from 'containers/RepoLabels';
import RepoLoader from 'containers/RepoLoader';
import Drawer from 'material-ui/Drawer';
import styles from './styles.css';


const customContentStyle = {
    width: '340px',
    maxWidth: 'none',
    textAlign: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch'
};

const { bool, func } = PropTypes;
const propTypes = {
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
            errorMessage: 'for unlimited queries',
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
        const styles = {
            title: {
                cursor: 'pointer'
            },
            errorMessage: {
                color: this.state.errorMessage === 'for unlimited queries' ? '#607D8B' : '#e74c3c',
            },
        };

        const actions = [
            <FlatButton
                label="Sign in"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSignIn}
            />,
        ];
        const { userData, updateInProcess, issuesUpdatingList } = this.props;
        console.log('updating list: ', issuesUpdatingList);
        return (
            <div>
                <AppBar
                    showMenuIconButton={true}
                    title={
                        <span style={styles.title}>
                            {(Object.keys(userData).length !== 0) ?
                                userData.login : "Issues Probe Application"}
                        </span>
                    }
                    iconElementRight={
                        <FlatButton
                            label="Sign out"
                            onClick={this.handleSignOut}
                        />
                    }
                    onLeftIconButtonTouchTap={this.handleToggle}
                >
                    <div className={styles['refresh-indicator-div']}>
                        <RefreshIndicator
                            status={updateInProcess || (issuesUpdatingList && issuesUpdatingList.length > 0) ? "loading" : "ready"}
                            size={40}
                            left={-20}
                            top={0}
                            zDepth={0}
                            loadingColor={"#FFFFFF"}
                            style={{
                                marginLeft: '50%',
                                marginTop: '.5em',
                                backgroundColor: '#00bcd4',
                                boxShadow: 'none'
                            }}
                        />
                    </div>
                </AppBar>

                <Dialog
                    title="Sign in to GitHub"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    onRequestClose={this.handleClose}
                >
                    <span style={styles.errorMessage}>
                        {this.state.errorMessage}
                    </span>
                    <TextField
                        hintText="username"
                        floatingLabelText="Enter your username"
                        floatingLabelStyle={{color: '#607D8B'}}
                        underlineStyle={{borderColor: '#607D8B'}}
                        ref={me => this.usernameField = me}
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Enter your password"
                        floatingLabelStyle={{color: '#607D8B'}}
                        underlineStyle={{borderColor: '#607D8B'}}
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
