import React, {Component, PropTypes} from 'react';
import ListLabelsHeader from 'components/ListLabelsHeader';
import ListOfLabels from 'components/ListOfLabels';

const { string, shape, arrayOf, bool, func } = PropTypes;
const propTypes = {
    username: string.isRequired,
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    handleDeleteLabel: func.isRequired,
    handleUpdateLabel: func.isRequired,

    handleCreateLabel: func.isRequired,
};

class LabelTab extends Component {

    render() {
        const {
            username,
            labelsList,
            updateInProcess,
            handleCreateLabel,
            handleUpdateLabel,
            handleDeleteLabel,
        } = this.props;
        return (
            <div>
                <ListLabelsHeader handleCreateLabel={handleCreateLabel} />
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

LabelTab.propTypes = propTypes;

export default LabelTab;
