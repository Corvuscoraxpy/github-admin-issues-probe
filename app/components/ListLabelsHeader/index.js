import React, {Component, PropTypes} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton';
import EditLabelForm from 'components/EditLabelForm';

import styles from './styles.css';
const {Grid, Row, Col} = require('react-flexbox-grid');

const { bool, func } = PropTypes;
const propTypes = {
    handleCreateLabel: func.isRequired,
};

class ListLabelsHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false,
        };
    }

    render() {
        const { handleCreateLabel } = this.props;
        return (
            <div>
                {this.state.showEditForm === false ?

                    <Row className={styles['rowStyle']}>
                        <Col sm={6} >
                            <FlatButton
                                className={styles['flat-button']}
                                backgroundColor="#17a88c"
                                hoverColor="#1abc9c"
                                label="New Label"
                                onTouchTap={this.handleTouchNewLabel}
                            />
                        </Col>
                    </Row> :

                    <EditLabelForm
                        editing={false}
                        handleCreateLabel={handleCreateLabel}
                        onCancleEdit={this.onCancleEdit}
                    />
                }
            </div>
        );
    }

    onCancleEdit = () => {
        this.setState({
            showEditForm: false,
        });
    }

    handleTouchNewLabel = () => {
        this.setState({
            showEditForm: true,
        });
    }

}

ListLabelsHeader.propTypes = propTypes;

export default ListLabelsHeader;
