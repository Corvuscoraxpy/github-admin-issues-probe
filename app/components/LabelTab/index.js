import React, {Component, PropTypes} from 'react';
import ListLabelsHeader from 'components/ListLabelsHeader';
import ListOfLabels from 'components/ListOfLabels';
import styles from './styles.css';

const {Grid, Row, Col} = require('react-flexbox-grid');

const { string, shape, arrayOf, bool, func } = PropTypes;
const propTypes = {
    permission: bool.isRequired,
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
            permission,
            labelsList,
            selectedRepository,
            handleCreateLabel,
            handleUpdateLabel,
            handleDeleteLabel,
        } = this.props;
        return (
            <div className={styles['div-wrap']}>
                {selectedRepository
                    ?   <span className={styles['span-header']}>Repository Labels</span>
                    :   null
                }
                {permission && selectedRepository
                    ?   <ListLabelsHeader handleCreateLabel={handleCreateLabel} />
                    :   ""
                }
                <ListOfLabels
                    permission={permission}
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
