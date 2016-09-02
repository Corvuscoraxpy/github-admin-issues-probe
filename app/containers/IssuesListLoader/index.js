import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getSelectedRepo } from 'containers/RepoLoader/selectors';
import { getUserName, getPassword } from 'containers/AuthorizationBar/selectors';
import { getIssueList, getLabelsList } from './selectors';

import ListOfIssues from 'components/ListOfIssues';
let api = require("../../api/restUtilities.js");

class IssuesListLoader extends Component {

  componentWillReceiveProps(nextProps) {
    const { username, password, selectedRepo } = this.props;
    if (nextProps.selectedRepo !== selectedRepo) {
      api.fetchIssueForRepository(username, password, nextProps.selectedRepo)
        .then(res =>{
          if(res.status !== 200) {
            throw Error('Bad validation');
          }
          return res.json();
        })
        .then(res => {
          const { loadIssuesForRepoAction } = this.props;
          loadIssuesForRepoAction(res);
        })
        .catch(error => console.log(error));

      api.fetchListLabelsForRepository(username, password, nextProps.selectedRepo)
        .then(res => {
          if(res.status !== 200) {
            throw Error('Bad validation');
          }
          return res.json();
        })
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
      <ListOfIssues
        issuesList={issuesList}
        labelsList={labelsList}
        changeCurrentIssueAction={changeCurrentIssueAction}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  password: getPassword(),
  selectedRepo: getSelectedRepo(),
  issuesList: getIssueList(),
  labelsList: getLabelsList(),
});

IssuesListLoader.defaultProps = {
  issuesList: [],
  labelsList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesListLoader);
