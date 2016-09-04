import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getRepositoryList, getSelectedRepository, getRepositoryOwner } from './selectors';

import { getUserName } from 'containers/AuthorizationBar/selectors';
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
        const { repositoryList, username } = this.props;
        return (
            <RepoSelector
                username={username}
                repositoryList={repositoryList}
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
        const { changeRepositoryOwnerAction } = this.props;
        changeRepositoryOwnerAction(repositoryOwner);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),

  repositoryOwner: getRepositoryOwner(),
  repositoryList: getRepositoryList(),
  selectedRepository:getSelectedRepository(),
});

RepoLoader.defaultProps = {
  repositoryList: [],
  selectedRepository: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoLoader);
