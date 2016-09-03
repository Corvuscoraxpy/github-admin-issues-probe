import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getRepoList, getSelectedRepo, getRepoOwner } from './selectors';
import { getUserName, getAuthorization } from 'containers/AuthorizationBar/selectors';
import ListOfRepos from 'components/ListOfRepos';
let api = require("../../api/restUtilities.js");


class RepoLoader extends Component {

  componentWillReceiveProps(nextProps) {
    const { repoOwner } = nextProps;
    if (repoOwner !== this.props.repoOwner) {
      api.fetchListUserRepositories(repoOwner, this.props.authorization)
        .then(res => {
          const { loadRepoListAction } = this.props;
          loadRepoListAction(res);
        })
        .catch(error => console.log(error));
    }
  }
  
  render() {
    const { repoList, username, selectRepoAction, selectRepoOwnerAction } = this.props;
    return (
      <ListOfRepos
        username={username}
        repoList={repoList}
        selectRepoAction={selectRepoAction}
        selectRepoOwnerAction={selectRepoOwnerAction}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  authorization: getAuthorization(),
  repoOwner: getRepoOwner(),
  repoList: getRepoList(),
  selectedRepo:getSelectedRepo(),
});

RepoLoader.defaultProps = {
  repoList: [],
  selectedRepo: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoLoader);
