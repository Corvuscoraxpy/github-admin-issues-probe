import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';

export default class ListOfIssues extends Component {

  handleTouchTap = (issue) => {
    const { changeCurrentIssueAction } = this.props;
    changeCurrentIssueAction(issue);
  }

  render() {
    const { issuesList } = this.props;

    console.log(issuesList);
    const issuesNode = issuesList.map((issue, index) => {
      const iconStyle = {
        height: 44
      }
      return (
        <ListItem
          leftIcon={<AlertErrorOutline style={iconStyle} color={issue.state === 'open' ? 'green' : 'red'} />}
          primaryText={issue.title}
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>#{issue.number} </span>
              opened by {issue.user.login}.
            </p>
          }
          secondaryTextLines={2}
          key={index}
          value={issue}
          onTouchTap={() => this.handleTouchTap(issue)}
        />
      );
    });

    return (
      <List>
        <Subheader>Issues</Subheader>
        {issuesNode}
      </List>
    );
  }
}

ListOfIssues.propTypes = {
  issuesList: PropTypes.array,
  changeCurrentIssueAction: PropTypes.func,
}
