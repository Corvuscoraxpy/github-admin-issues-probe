import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LabelTap from 'components/LabelTab';
import ListOfIssues from 'components/ListOfIssues';


const {arrayOf, shape, object, string, bool, func} = PropTypes;
const propTypes = {
    issuesList: arrayOf(object.isRequired).isRequired,
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    permission: bool.isRequired,
    handleUpdateLabel: func.isRequired,
    handleCreateLabel: func.isRequired,
    handleChangeCurrentIssue: func.isRequired,
};

class IssueLabelTab extends Component {

    render() {
        const {
            issuesList,
            labelsList,
            permission,
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
                    permission={permission}
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

IssueLabelTab.propTypes = propTypes;

export default IssueLabelTab;
