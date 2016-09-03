import React, { Component, PropTypes } from 'react';
import LabelListItem from 'components/LabelListItem';

export default class ListOfLabels extends Component {


  render() {
    const { labelsList, deleteLabel, updateLabel } = this.props;
    const labelsNode = labelsList.map((label, index) => {
      return (
        <LabelListItem
          label={label}
          index={index}
          deleteLabel={deleteLabel}
          updateLabel={updateLabel}
        />
      );
    });
    return(
      <ul style={{ padding: 0}}>
        {labelsNode}
      </ul>
    );
  }
}

ListOfLabels.propTypes = {
  labelsList: PropTypes.array,
  deleteLabel: PropTypes.func,
  updateLabel: PropTypes.func,
};
