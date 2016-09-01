import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getSelectedRepo } from 'containers/RepoLoader/selectors';
import { getUserName, getPassword } from 'containers/AuthorizationBar/selectors';
import { getIssueList } from './selectors';

import ListOfIssues from 'components/ListOfIssues';
let api = require("../../api/restUtilities.js");

class IssuesListLoader extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(this.props.selectedRepo, nextProps.selectedRepo);
    const { username, password, selectedRepo } = this.props;
    console.log(username);
    if (nextProps.selectedRepo !== selectedRepo) {
      api.fetchIssueForRepository(username, password, nextProps.selectedRepo)
        .then(res =>{
          if(res.status !== 200) {
            throw Error('Bad validation');
          }
          return res.json();
        })
        .then(res => {
        this.props.loadIssuesForRepoAction(res);
      }).catch(error => console.log(error));
    }
  }

  render() {
    return (
      <ListOfIssues issuesList={this.props.issuesList} />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  password: getPassword(),
  selectedRepo: getSelectedRepo(),
  issuesList: getIssueList(),
});

IssuesListLoader.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesListLoader);
