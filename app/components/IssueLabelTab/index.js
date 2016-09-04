import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import ListOfLabels from 'components/ListOfLabels';
import ListOfIssues from 'components/ListOfIssues';

export default class IssueLabelTab extends Component {

    render() {
        const {
            issuesList,
            labelsList,
            username,
            handleDeleteLabel,
            handleUpdateLabel,
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
                <ListOfLabels
                    username={username}
                    labelsList={labelsList}
                    handleDeleteLabel={handleDeleteLabel}
                    handleUpdateLabel={handleUpdateLabel}
                />
            </Tab>
      </Tabs>
    );
  }
}

IssueLabelTab.propTypes = {
    issuesList: PropTypes.array,
    labelLis: PropTypes.array,
    handleChangeCurrentIssue: PropTypes.func,
    handleDeleteLabel: PropTypes.func,
    handleUpdateLabel: PropTypes.func,
}
