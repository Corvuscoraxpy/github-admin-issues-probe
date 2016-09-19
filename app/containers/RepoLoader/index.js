import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getRepositoryList, getSelectedRepository, getRepositoryOwner, getRepositoryOwnerData } from './selectors';
import { getStatusOfUpdating } from 'containers/RepoLabels/selectors';
import { getUserName } from 'containers/AuthorizationBar/selectors';
import { getIssuesUpdatingList } from 'containers/IssueInteraction/selectors';
import RepoSelector from 'components/RepoSelector';


class RepoLoader extends Component {

    componentWillReceiveProps(nextProps) {
        const { repositoryOwner } = nextProps;
        const { fetchListUserRepositoriesAction } = this.props;
        if (repositoryOwner !== this.props.repositoryOwner) {
            fetchListUserRepositoriesAction(repositoryOwner);
        }
    }

    render() {
        const {
            repositoryList,
            username,
            updateInProcess,
            repositoryOwnerData,
            issuesUpdatingList
        } = this.props;
        return (
            <RepoSelector
                username={username}
                updateInProcess={updateInProcess}
                repositoryOwnerData={repositoryOwnerData}
                repositoryList={repositoryList}
                issuesUpdatingList={issuesUpdatingList}
                onSelectRepository={this.handleSelectRepository}
                onChangeRepositoryOwner={this.handleChangeRepositoryOwner}
            />
        );
    }

    handleSelectRepository = (selectedRepository) => {
        const { selectRepositoryAction } = this.props;
        selectRepositoryAction(selectedRepository);
    }

    handleChangeRepositoryOwner = (repositoryOwner) => {
        const { fetchRepositoryOwnerAction } = this.props;
        fetchRepositoryOwnerAction(repositoryOwner);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  updateInProcess: getStatusOfUpdating(),
  repositoryOwner: getRepositoryOwner(),
  repositoryOwnerData: getRepositoryOwnerData(),
  repositoryList: getRepositoryList(),
  selectedRepository: getSelectedRepository(),
  issuesUpdatingList: getIssuesUpdatingList(),
});

RepoLoader.defaultProps = {
  repositoryList: [],
  selectedRepository: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoLoader);
