import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';

import { getIssueList, getLabelsList } from './selectors';
import { getSelectedRepository, getRepositoryOwner, getPermission } from 'containers/RepoLoader/selectors';

import IssueLabelTab from 'components/IssueLabelTab';


class RepoDataLoader extends Component {

    componentWillReceiveProps(nextProps) {
        const {
            repositoryOwner,
            selectedRepository,
            fetchIssueForRepositoryAction,
            fetchListLabelsForRepositoryAction,
        } = this.props;

        if (nextProps.selectedRepository !== selectedRepository) {
            fetchIssueForRepositoryAction(repositoryOwner, nextProps.selectedRepository);
            fetchListLabelsForRepositoryAction(repositoryOwner, nextProps.selectedRepository);

        }
    }

    render() {
        const { issuesList, changeCurrentIssueAction,selectedRepository,
            labelsList, username, updateInProcess, permission } = this.props;
        return (
            <IssueLabelTab
                permission={permission}
                issuesList={issuesList}
                labelsList={labelsList}
                handleChangeCurrentIssue={this.handleChangeCurrentIssue}
                handleDeleteLabel={this.handleDeleteLabel}
                handleUpdateLabel={this.handleUpdateLabel}
                handleCreateLabel={this.handleCreateLabel}
                hadleChangeActiveTab={this.hadleChangeActiveTab}
            />
        );
    }

    handleDeleteLabel = (labelName) => {
        const { deleteLablelAction } = this.props;
        deleteLablelAction(labelName);
    }

    handleUpdateLabel = (labelUrl, newName, newColor) => {
        const { updateLabelAction } = this.props;
        updateLabelAction(labelUrl, newName, newColor);
    }

    handleCreateLabel = (name, color) => {
        const { createLabelAction } = this.props;
        createLabelAction(name, color);
    }

    handleChangeCurrentIssue = (currentIssue) => {
        const { fetchSingleIssueAction } = this.props;
        fetchSingleIssueAction(currentIssue);
    }

    hadleChangeActiveTab = (activeTab) => {
        const { changeActiveTabAction } = this.props;
        changeActiveTabAction(activeTab);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    permission: getPermission(),
    repositoryOwner: getRepositoryOwner(),
    selectedRepository: getSelectedRepository(),
    issuesList: getIssueList(),
    labelsList: getLabelsList(),
});

RepoDataLoader.defaultProps = {
    issuesList: [],
    labelsList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoDataLoader);
