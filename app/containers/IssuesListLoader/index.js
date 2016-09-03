import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getSelectedRepo, getRepoOwner } from 'containers/RepoLoader/selectors';
import { getUserName, getAuthorization } from 'containers/AuthorizationBar/selectors';
import { getIssueList, getLabelsList } from './selectors';

import IssueLabelTab from 'components/IssueLabelTab';
let api = require("../../api/restUtilities.js");

class IssuesListLoader extends Component {

  componentWillReceiveProps(nextProps) {
    const { authorization, repoOwner, selectedRepo } = this.props;
    if (nextProps.selectedRepo !== selectedRepo) {
      api.fetchIssueForRepository(authorization, repoOwner, nextProps.selectedRepo)
        .then(res => {
          const { loadIssuesForRepoAction } = this.props;
          loadIssuesForRepoAction(res);
        })
        .catch(error => console.log(error));

      api.fetchListLabelsForRepository(authorization, repoOwner, nextProps.selectedRepo)
        .then(res => {
          const { loadLabelsForRepoAction } = this.props;
          loadLabelsForRepoAction(res);
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const {
      issuesList,
      changeCurrentIssueAction,
      labelsList,
     } = this.props;
    return (
      <IssueLabelTab
        issuesList={issuesList}
        labelsList={labelsList}
        changeCurrentIssueAction={changeCurrentIssueAction}
        deleteLabel={this.deleteLabel}
        updateLabel={this.updateLabel}
      />
    );
  }

  deleteLabel = (labelName) => {
    const { authorization, repoOwner, selectedRepo } = this.props;
    api.deleteLabel(authorization, repoOwner, selectedRepo, labelName)
      .then( res => {
        console.log(res.status);
        if(res.status === 204) {

          api.fetchListLabelsForRepository(authorization, repoOwner, selectedRepo)
            .then(res => {
              console.log('load labels after delete: ', res);
              const { loadLabelsForRepoAction } = this.props;
              loadLabelsForRepoAction(res);
            })
            .catch(error => console.log(error));

        }
      });
  }

  updateLabel = (labelUrl, newName, newColor) => {
    const { authorization } = this.props;
    api.updateLabel(authorization, labelUrl, newName, newColor)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  repoOwner: getRepoOwner(),
  authorization: getAuthorization(),
  selectedRepo: getSelectedRepo(),
  issuesList: getIssueList(),
  labelsList: getLabelsList(),
});

IssuesListLoader.defaultProps = {
  issuesList: [],
  labelsList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesListLoader);
