import React, { Component, PropTypes } from 'react';
import LabelListItem from 'components/LabelListItem';
import styles from './styles.css';

const { arrayOf, shape, string, func} = PropTypes;
const propTypes = {
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    handleDeleteLabel: func.isRequired,
    handleUpdateLabel: func.isRequired,
};

class ListOfLabels extends Component {

    render() {
        const { labelsList, handleDeleteLabel, handleUpdateLabel } = this.props;
        const labelsNode = labelsList.map((label, index) => {
            return (
                <LabelListItem
                    label={label}
                    key={index}
                    id={index}
                    handleDeleteLabel={handleDeleteLabel}
                    handleUpdateLabel={handleUpdateLabel}
                />
            );
        });

        return (
            <ul className={styles['label-list']}>
                {labelsNode}
            </ul>
        );
    }
}


ListOfLabels.propTypes = propTypes;

export default ListOfLabels;
