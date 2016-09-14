import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import AuthorizationBar from 'containers/AuthorizationBar';
import RepoDataLoader from 'containers/RepoDataLoader';
import IssueInteraction from 'containers/IssueInteraction';
import RepoLoader from 'containers/RepoLoader';
import styles from './styles.css';

const {Grid, Row, Col} = require('react-flexbox-grid');

const {object, func} = PropTypes;
const propTypes = {
    pagination: object,
    onFetchIssuePerPage: func.isRequired,
};


class App extends Component {

    render() {
        return (
            <Grid className={styles['grid']}>
                <Row className={styles['row']}>
                    <Col sm={12} className={styles['col-auth']}>
                        <AuthorizationBar/>
                    </Col>
                </Row>
                <Row className={styles['row']}>
                    <Col sm={4} className={styles['col-repo']} onScroll={this.handleScroll}>
                        <Paper
                            className={styles['col-paper']}
                            zDepth={1}>

                            <RepoDataLoader />
                        </Paper>
                    </Col>
                    <Col sm={8} className={styles['col-issue']}>
                        <IssueInteraction />
                    </Col>
                </Row>
            </Grid>
        );
    }

    handleScroll = (e) => {
        const { onFetchIssuePerPage, pagination, activeTab } = this.props;
        //  if scroll to bottom
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
            if (pagination && pagination.next && pagination.next.url) {
                    onFetchIssuePerPage(pagination.next.url);
            }
        }

    }
}

App.propTypes = propTypes;

export default App;
