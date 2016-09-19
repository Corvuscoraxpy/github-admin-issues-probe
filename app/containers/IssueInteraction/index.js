import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getCurrentIssue } from 'containers/RepoIssues/selectors';
import { getLabelsList, getStatusOfUpdating } from 'containers/RepoLabels/selectors';
import { getPermission } from 'containers/RepoLoader/selectors';
import { getListOfComments, getIssuesUpdatingList } from './selectors';

import Issue from 'components/Issue';



class IssueInteraction extends Component {

    componentWillReceiveProps(nextProps) {
        const { currentIssue, fetchListCommentsOnAnIssueAction } = this.props;
        if (nextProps.currentIssue !== currentIssue) {
            fetchListCommentsOnAnIssueAction(nextProps.currentIssue.comments_url);
        }
    }

    render() {
        const {
            currentIssue,
            listOfComments,
            labelsList,
            permission,
            issuesUpdatingList,
            updateInProcess
        } = this.props;
        return (
            <Issue
                permission={permission}
                labelsList={labelsList}
                currentIssue={currentIssue}
                updateInProcess={updateInProcess}
                listOfComments={listOfComments}
                issuesUpdatingList={issuesUpdatingList}
                addLabelsToAnIssue={this.addLabelsToAnIssue}
                removeLabelFromAnIssue={this.removeLabelFromAnIssue}
                fetchSingleIssueForUpdate={this.fetchSingleIssueForUpdate}
            />
        );
    }


    addLabelsToAnIssue = (number, labelsToAdd) => {
        const { addLabelsToAnIssueAction } = this.props;
        addLabelsToAnIssueAction(number, labelsToAdd);
    }

    removeLabelFromAnIssue = (number, name) => {
        const { removeLabelFromAnIssueAction } = this.props;
        removeLabelFromAnIssueAction(number, name);
    }

    fetchSingleIssueForUpdate = (number) => {
        const { fetchSingleIssueForUpdateAction, addToIssuesUpdatingListAction } = this.props;
        addToIssuesUpdatingListAction(number);
        fetchSingleIssueForUpdateAction(number);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    permission: getPermission(),
    currentIssue: getCurrentIssue(),
    listOfComments: getListOfComments(),
    labelsList: getLabelsList(),
    updateInProcess: getStatusOfUpdating(),
    issuesUpdatingList: getIssuesUpdatingList(),
});

IssueInteraction.defaultProps = {
    listOfComments: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueInteraction);
