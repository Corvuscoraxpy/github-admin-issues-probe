import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getCurrentIssue } from 'containers/IssuesListLoader/selectors';
import { getUserName, getPassword } from 'containers/AuthorizationBar/selectors';
import { getListOfComments } from './selectors';

import Issue from 'components/Issue';

let api = require("../../api/restUtilities.js");

class IssueInteraction extends Component {

  componentWillReceiveProps(nextProps) {
    const { username, password, currentIssue } = this.props;
    if (nextProps.currentIssue !== currentIssue) {
      api.fetchListCommentsOnAnIssue(username, password, nextProps.currentIssue.comments_url)
        .then(res =>{
          if(res.status !== 200) {
            throw Error('Bad validation');
          }
          return res.json();
        })
        .then(res => {
          const { getListCommentsOnAnIssueAction } = this.props;
          getListCommentsOnAnIssueAction(res);
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { currentIssue, listOfComments } = this.props;
    return (
      <Issue currentIssue={currentIssue} listOfComments={listOfComments} />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  currentIssue: getCurrentIssue(),
  username: getUserName(),
  password: getPassword(),
  listOfComments: getListOfComments(),
});

IssueInteraction.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(IssueInteraction);
