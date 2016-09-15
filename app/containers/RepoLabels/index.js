import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as actions from './actions';
import { getLabelsList } from './selectors';

import { getSelectedRepository, getRepositoryOwner, getPermission } from 'containers/RepoLoader/selectors';

import LabelTab from 'components/LabelTab';


class RepoLabels extends Component {

    componentWillReceiveProps(nextProps) {
        const {
            repositoryOwner,
            selectedRepository,
            fetchListLabelsForRepositoryAction,
        } = this.props;

        if (nextProps.selectedRepository !== selectedRepository) {
            fetchListLabelsForRepositoryAction(repositoryOwner, nextProps.selectedRepository);
        }
    }

    render() {
        const { labelsList, permission, selectedRepository } = this.props;
        return (
            <LabelTab
                permission={permission}
                labelsList={labelsList}
                selectedRepository={selectedRepository}
                handleDeleteLabel={this.handleDeleteLabel}
                handleUpdateLabel={this.handleUpdateLabel}
                handleCreateLabel={this.handleCreateLabel}
            />
        );
    }

    handleDeleteLabel = (labelName) => {
        const { deleteLablelAction } = this.props;
        deleteLablelAction(labelName);
    }

    handleUpdateLabel = (labelUrl, newName, newColor) => {
        const { updateLabelAction } = this.props;
        updateLabelAction(labelUrl, newName, newColor);
    }

    handleCreateLabel = (name, color) => {
        const { createLabelAction } = this.props;
        createLabelAction(name, color);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    permission: getPermission(),
    labelsList: getLabelsList(),
    repositoryOwner: getRepositoryOwner(),
    selectedRepository: getSelectedRepository(),
});

RepoLabels.defaultProps = {
    labelsList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoLabels);
