import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getCurrentIssue } from 'containers/RepoDataLoader/selectors';
import { getListOfComments } from './selectors';

import Issue from 'components/Issue';



class IssueInteraction extends Component {

    componentWillReceiveProps(nextProps) {
        const { currentIssue, fetchListCommentsOnAnIssueAction } = this.props;
        if (nextProps.currentIssue !== currentIssue) {
            fetchListCommentsOnAnIssueAction(nextProps.currentIssue.comments_url);
        }
    }

    render() {
        const { currentIssue, listOfComments } = this.props;
        return (
            <Issue
                currentIssue={currentIssue}
                listOfComments={listOfComments}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    currentIssue: getCurrentIssue(),
    listOfComments: getListOfComments(),
});

IssueInteraction.defaultProps = {
    listOfComments: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueInteraction);
