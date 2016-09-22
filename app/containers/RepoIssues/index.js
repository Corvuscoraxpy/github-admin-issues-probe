import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';

import { getIssueList } from './selectors';
import { getSelectedRepository, getRepositoryOwner} from 'containers/RepoLoader/selectors';

import ListOfIssues from 'components/ListOfIssues';


class RepoIssues extends Component {

    componentWillReceiveProps(nextProps) {
        const {
            repositoryOwner,
            selectedRepository,
            fetchIssueForRepositoryAction,
        } = this.props;

        if (nextProps.selectedRepository !== selectedRepository && !!nextProps.selectedRepository) {
            fetchIssueForRepositoryAction(repositoryOwner, nextProps.selectedRepository);
        }
    }

    render() {
        const { issuesList } = this.props;
        return (
            <ListOfIssues
                issuesList={issuesList}
                handleChangeCurrentIssue={this.handleChangeCurrentIssue}
            />
        );
    }

    handleChangeCurrentIssue = (currentIssue) => {
        const { changeCurrentIssueAction } = this.props;
        changeCurrentIssueAction(currentIssue);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    issuesList: getIssueList(),
    repositoryOwner: getRepositoryOwner(),
    selectedRepository: getSelectedRepository(),
});

RepoIssues.defaultProps = {
    issuesList: [],
    labelsList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoIssues);
