import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import EditLabelForm from 'components/EditLabelForm';
import styles from './styles.css';

import { getContrastYIQ } from '../../api/format.js';
const {Grid, Row, Col} = require('react-flexbox-grid');

const {shape, string, arrayOf, number, bool, func} = PropTypes;
const propTypes = {
    label: shape({
        name: string.isRequired,
        color: string.isRequired,
    }).isRequired,
    id: number.isRequired,
    permission: bool.isRequired,
    issuesUpdatingList: arrayOf(number).isRequired,
    handleDeleteLabel: func.isRequired,
    handleUpdateLabel: func.isRequired,
};

class LabelListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false,
            removeRequest: false,
            removed: false,
            edited: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            removed: false,
            edited: false,
        });
    }

    render() {
        const { label, id, permission, handleDeleteLabel, issuesUpdatingList } = this.props;
        const { removeRequest, showEditForm, removed, edited } = this.state;
        const style = {
            paper: {
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 2,
                height: '100%',
                textAlign: 'center',
                borderRadius: '3px',
                backgroundColor: `#${label.color}`,
                color: getContrastYIQ(label.color)
            },
        };

        return (
            <li key={id} className={styles['list-item']}>

                {removeRequest
                    ?   <DeleteForm
                            label={label}
                            handleDeleteLabel={handleDeleteLabel}
                            onCancleRemove={this.onCancleRemove}
                            onRemoved={this.onRemoved}
                        />

                    :   !showEditForm
                            ?   <Row className={styles['row']}>
                                    <Col sm={6}>
                                        <Paper style={style.paper}>
                                            {label.name}
                                        </Paper>
                                    </Col>

                                {permission && !removed && !edited && issuesUpdatingList.length === 0
                                    ?   <Col sm={6}>
                                            <FlatButton
                                                icon={<EditorModeEdit color="#E0E0E0" />}
                                                onTouchTap={this.handleTouchEdit}
                                                hoverColor="#F5F5F5"
                                            />
                                            <FlatButton
                                                icon={<ActionDelete color="#E0E0E0" />}
                                                onTouchTap={this.handleTouchDelete}
                                                hoverColor="#F5F5F5"
                                            />
                                        </Col>
                                    :   !permission
                                            ?   <Col sm={6}>
                                                    <span className={styles['span-info']}>
                                                        No permission...
                                                    </span>
                                                </Col>
                                            :   <Col sm={6}>
                                                    <span className={styles['span-info']}>
                                                        Wait for update...
                                                    </span>
                                                </Col>
                                }
                                </Row>

                            :   <EditLabelForm
                                    editing={true}
                                    onEdited={this.onEdited}
                                    label={label}
                                    handleUpdateLabel={this.props.handleUpdateLabel}
                                    onCancleEdit={this.onCancleEdit}
                                />
                }
            </li>
        );
    }

	handleTouchEdit = () => {
        this.setState({showEditForm: true});
    }

    onCancleEdit = () => {
        this.setState({showEditForm: false});
    }

    handleTouchDelete = () => {
        this.setState({removeRequest: true});
    }

    onCancleRemove = () => {
        this.setState({removeRequest: false});
    }

    onRemoved = () => {
        this.setState({removed: true});
    }

    onEdited = () => {
        this.setState({edited: true});
    }
}

const DeleteForm = ({label, handleDeleteLabel, onCancleRemove, onRemoved}) => {
    const handleTouchDel = () => {
        handleDeleteLabel(label.name);
        onRemoved();
        onCancleRemove();
    };

    const handleCancleRemove = () => {
        onCancleRemove();
    }
    return (
        <Row className={styles['row']}>
            <Col sm={6}>
                <span>
                    <strong className={styles['strong']}>
                        Are you sure?
                    </strong>
                    <span className={styles['span']}>
                        {" "}Deleting a label will remove it from all issues and pull requests.
                    </span>
                </span>
            </Col>
            <Col sm={6}>
                <FlatButton
                    label="Cancel"
                    onTouchTap={handleCancleRemove}
                />
                <FlatButton
                    icon={<ActionDelete color="#EF5350" />}
                    onTouchTap={handleTouchDel}
                    hoverColor="#F5F5F5"
                />
            </Col>
        </Row>

    );
}

LabelListItem.propTypes = propTypes;

export default LabelListItem;
