import React, { Component, PropTypes } from 'react';
import LabelListItem from 'components/LabelListItem';
import styles from './styles.css';

const { arrayOf, shape, number, bool, string, func} = PropTypes;
const propTypes = {
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    permission: bool.isRequired,
    issuesUpdatingList: arrayOf(number).isRequired,
    handleDeleteLabel: func.isRequired,
    handleUpdateLabel: func.isRequired,
};

class ListOfLabels extends Component {

    render() {
        const { labelsList, handleDeleteLabel, handleUpdateLabel, permission, issuesUpdatingList } = this.props;
        const labelsNode = labelsList.map((label, index) => {
            return (
                <LabelListItem
                    permission={permission}
                    issuesUpdatingList={issuesUpdatingList}
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
