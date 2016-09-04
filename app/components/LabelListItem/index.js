import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import EditLabelForm from 'components/EditLabelForm';
const {Grid, Row, Col} = require('react-flexbox-grid');


export default class LabelListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false,
        }
    }

    render() {
        const styles = {
            paper: {
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 2,
                height: '100%',
                textAlign: 'center',
                borderRadius: '3px',
                backgroundColor: `#${this.props.label.color}`,
                color: getContrastYIQ(this.props.label.color)
            },
            listItem: {
                listStyle: 'none',
                marginBottom: '20px'
            }
        };

        const { label, id } = this.props;
        return (
            <li
                key={id}
                style={styles.listItem}
            >

                {this.state.showEditForm === false ?

                    <Row style={{padding: 0, margin: 0}}>
                        <Col sm={6}>
                            <Paper style={styles.paper}>
                                {label.name}
                            </Paper>
                        </Col>
                        <Col sm={6}>
                            <FlatButton
                                icon={<EditorModeEdit />}
                                onTouchTap={this.handleTouchEdit}
                            />
                            <FlatButton
                                icon={<ActionDelete />}
                                onTouchTap={this.handleTouchDelete}
                            />
                        </Col>
                    </Row> :

                    <EditLabelForm
                        label={label}
                        handleUpdateLabel={this.props.handleUpdateLabel}
                        onCancleEdit={this.onCancleEdit}
                    />
                }
            </li>
        );
    }

	handleTouchEdit = () => {
        this.setState({
            showEditForm: true,
        });
    }

    onCancleEdit = () => {
        this.setState({
            showEditForm: false,
        });
    }

    handleTouchDelete = () => {
        const { handleDeleteLabel, label } = this.props;
        handleDeleteLabel(label.name);
    }
}

const getContrastYIQ = (hexcolor) => {
	let r = parseInt(hexcolor.substr(0,2),16);
	let g = parseInt(hexcolor.substr(2,2),16);
	let b = parseInt(hexcolor.substr(4,2),16);
	let yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

LabelListItem.propTypes = {
    label: PropTypes.object,
    id: PropTypes.number,
    handleDeleteLabel: PropTypes.func,
};
