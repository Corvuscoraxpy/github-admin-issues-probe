import React, { Component, PropTypes } from 'react';
import LabelListItem from 'components/LabelListItem';


export default class ListOfLabels extends Component {

    render() {
        const {
            labelsList,
            handleDeleteLabel,
            handleUpdateLabel,
            username } = this.props;
        const labelsNode = labelsList.map((label, index) => {
            return (
                <LabelListItem
                    username={username}
                    label={label}
                    key={index}
                    id={index}
                    handleDeleteLabel={handleDeleteLabel}
                    handleUpdateLabel={handleUpdateLabel}
                />
            );
        });

        return (
            <ul style={{ padding: 0}}>
                {labelsNode}
            </ul>
        );
    }
}

ListOfLabels.propTypes = {
    username: PropTypes.string,
    labelsList: PropTypes.array,
    handleDeleteLabel: PropTypes.func,
    handleUpdateLabel: PropTypes.func,
};
