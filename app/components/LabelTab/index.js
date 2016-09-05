import React, {Component, PropTypes} from 'react';
import ListLabelsHeader from 'components/ListLabelsHeader';
import ListOfLabels from 'components/ListOfLabels';

export default class LabelTab extends Component {

    render() {
        const {
            updateInProcess,
            handleCreateLabel,
            username,
            labelsList,
            handleUpdateLabel,
            handleDeleteLabel,
        } = this.props;
        return (
            <div>
                <ListLabelsHeader
                    updateInProcess={updateInProcess}
                    handleCreateLabel={handleCreateLabel}
                />
                <ListOfLabels
                    username={username}
                    labelsList={labelsList}
                    handleUpdateLabel={handleUpdateLabel}
                    handleDeleteLabel={handleDeleteLabel}
                />
            </div>

        );
    }
}

LabelTab.propTypes = {
    username: PropTypes.string,
    labelsList: PropTypes.array,
    handleDeleteLabel: PropTypes.func,
    handleUpdateLabel: PropTypes.func,

    updateInProcess: PropTypes.bool,
    handleCreateLabel: PropTypes.func,
}
