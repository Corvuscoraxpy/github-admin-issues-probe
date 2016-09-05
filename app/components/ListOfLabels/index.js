import React, { Component, PropTypes } from 'react';
import LabelListItem from 'components/LabelListItem';
import ListLabelsHeader from 'components/ListLabelsHeader';

export default class ListOfLabels extends Component {

    render() {
        const {
            labelsList,
            handleDeleteLabel,
            handleUpdateLabel,
            handleCreateLabel,
            username } = this.props;
        console.log(labelsList);
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

        return(
            <div>
                <ListLabelsHeader handleCreateLabel={handleCreateLabel} />
                <ul style={{ padding: 0}}>
                    {labelsNode}
                </ul>
            </div>
        );
    }
}

ListOfLabels.propTypes = {
  labelsList: PropTypes.array,
  handleDeleteLabel: PropTypes.func,
  handleUpdateLabel: PropTypes.func,
  handleCreateLabel: PropTypes.func,
};
