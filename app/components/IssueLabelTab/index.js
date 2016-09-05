import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import LabelTap from 'components/LabelTab';
import ListOfIssues from 'components/ListOfIssues';

export default class IssueLabelTab extends Component {

    render() {
        const {
            issuesList,
            labelsList,
            username,
            updateInProcess,
            handleDeleteLabel,
            handleUpdateLabel,
            handleCreateLabel,
            handleChangeCurrentIssue
        } = this.props;

    return (
        <Tabs>
            <Tab label="List Of Issues" >
                <ListOfIssues
                    issuesList={issuesList}
                    handleChangeCurrentIssue={handleChangeCurrentIssue}
                />
            </Tab>
            <Tab label="List of Labels">
                <LabelTap
                    updateInProcess={updateInProcess}
                    username={username}
                    labelsList={labelsList}
                    handleDeleteLabel={handleDeleteLabel}
                    handleUpdateLabel={handleUpdateLabel}
                    handleCreateLabel={handleCreateLabel}
                />
            </Tab>
      </Tabs>
    );
  }
}

IssueLabelTab.propTypes = {
    username: PropTypes.string,
    issuesList: PropTypes.array,
    labelLis: PropTypes.array,
    updateInProcess: PropTypes.bool,
    handleDeleteLabel: PropTypes.func,
    handleUpdateLabel: PropTypes.func,
    handleCreateLabel: PropTypes.func,
    handleChangeCurrentIssue: PropTypes.func,
}
