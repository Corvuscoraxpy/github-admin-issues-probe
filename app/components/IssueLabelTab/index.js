import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import ListOfLabels from 'components/ListOfLabels';
import ListOfIssues from 'components/ListOfIssues';

export default class IssueLabelTab extends Component {

  render() {
    const {
      issuesList,
      labelsList,
      deleteLabel,
      updateLabel,
      username,
      changeCurrentIssueAction
    } = this.props;
    return (
      <Tabs>
        <Tab label="List Of Issues" >
          <ListOfIssues
            issuesList={this.props.issuesList}
            changeCurrentIssueAction={this.props.changeCurrentIssueAction}
          />
        </Tab>
        <Tab label="List of Labels">
          <ListOfLabels
            username={username}
            labelsList={labelsList}
            deleteLabel={deleteLabel}
            updateLabel={updateLabel}
          />
        </Tab>
      </Tabs>
    );
  }
}

IssueLabelTab.propTypes = {
  repoOwner: PropTypes.string,
  issuesList: PropTypes.array,
  labelLis: PropTypes.array,
  changeCurrentIssueAction: PropTypes.func,
  deleteLabel: PropTypes.func,
  updateLabel: PropTypes.func,
}
