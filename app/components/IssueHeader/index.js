import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';

const {Grid, Row, Col} = require('react-flexbox-grid');

export default class IssueHeader extends Component {

    render() {
        const { currentIssue } = this.props;
        const styles = {
            button: {
                backgroundColor: currentIssue.state === 'open' ? '#17a88c' : '#e74c3c',
                color: 'white'
            }
        }

        return (
            <Paper style={{marginBottom: '8px', padding: '1em'}}>
                <Row>
                    <Col>
                        <h2>{currentIssue.title}</h2>
                    </Col>
                </Row>
                <FlatButton
                    disabled={true}
                    label={currentIssue.state}
                    primary={true}
                    style={styles.button}
                    icon={<AlertErrorOutline />}
                />
                <FlatButton
                    disabled={true}
                    label={currentIssue.comments}
                    primary={true}
                    icon={<CommunicationComment />}
                />
            </Paper>
        );
    }
}

IssueHeader.propTypes = {
    currentIssue: PropTypes.object,
};
