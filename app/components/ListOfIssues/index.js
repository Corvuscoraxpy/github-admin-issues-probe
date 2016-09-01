import React, { Component, PropType } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

export default class ListOfIssues extends Component {

  handleTouchTap = (issue) => {
    //e.preventDefault();
    const { changeCurrentIssueAction } = this.props;
    console.log("tap");
    changeCurrentIssueAction(issue);
    console.log(issue);
    //console.log(e);
  }

  render() {
    const issuesNode = this.props.issuesList.map((issue, index) => {
      return (
        <ListItem
          leftAvatar={<Avatar src="https://pp.vk.me/c630430/v630430054/4dbc7/ujERhlKhZig.jpg" />}
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
    )
  }
}
