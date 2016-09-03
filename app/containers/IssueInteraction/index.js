import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getCurrentIssue } from 'containers/IssuesListLoader/selectors';
import { getUserName, getAuthorization } from 'containers/AuthorizationBar/selectors';
import { getListOfComments } from './selectors';

import Issue from 'components/Issue';

let api = require("../../api/restUtilities.js");

class IssueInteraction extends Component {

  componentWillReceiveProps(nextProps) {
    const { authorization, currentIssue } = this.props;
    if (nextProps.currentIssue !== currentIssue) {
      api.fetchListCommentsOnAnIssue(authorization, nextProps.currentIssue.comments_url)
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
      <Issue
        currentIssue={currentIssue}
        listOfComments={listOfComments}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  currentIssue: getCurrentIssue(),
  username: getUserName(),
  authorization: getAuthorization(),
  listOfComments: getListOfComments(),
});

IssueInteraction.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(IssueInteraction);
