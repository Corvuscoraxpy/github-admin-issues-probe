import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { getContrastYIQ } from '../../api/format.js';

import EditLabelForm from 'components/EditLabelForm';
const {Grid, Row, Col} = require('react-flexbox-grid');

const {shape, string, number, bool, func} = PropTypes;
const propTypes = {
    label: shape({
        name: string.isRequired,
        color: string.isRequired,
    }).isRequired,
    id: number.isRequired,
    permission: bool.isRequired,
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
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({removed: false});
    }

    render() {
        const { label, id, permission, handleDeleteLabel } = this.props;
        const { removeRequest, showEditForm, removed } = this.state;
        const styles = {
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
            listItem: {
                listStyle: 'none',
                marginBottom: '20px'
            }
        };

        return (
            <li
                key={id}
                style={styles.listItem}

            >
                {removeRequest ?

                    <DeleteForm
                        label={label}
                        handleDeleteLabel={handleDeleteLabel}
                        onCancleRemove={this.onCancleRemove}
                        onRemoved={this.onRemoved}
                    />  :

                    !showEditForm ?

                        <Row style={{padding: 0, margin: 0}}>
                            <Col sm={6}>
                                <Paper style={styles.paper}>
                                    {label.name}
                                </Paper>
                            </Col>

                            {permission && !removed ?

                                <Col sm={6}>
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
                                </Col> :""
                            }

                        </Row> :

                        <EditLabelForm
                            editing={true}
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
        <Row style={{padding: 0, margin: 0}}>
            <Col sm={6}>
                <span>
                    <strong style={{color:"#EF5350", textAlign: 'center'}}>
                        Are you sure?
                    </strong>
                    <span style={{fontSize: '12px'}}>
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
