import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.css';
const {Grid, Row, Col} = require('react-flexbox-grid');

const {bool, shape, string, func} = PropTypes;
const propTypes = {
    editing: bool.isRequired,
    onCancleEdit: func.isRequired,
    label: shape({
        name: string.isRequired,
        color: string.isRequired,
    }).isRequired,
    handleUpdateLabel: func,
    handleCreateLabel: func,
};

const defaultProps = {
    label: {name: '', color: ''},
};

class EditLabelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: this.props.label.color,
            name: this.props.label.name,
            url: this.props.label.url,
            errorText: ''
        };
    }

    render() {
        const { name, color, errorText } = this.state;
        const { editing } = this.props;

        const styleHexColor = {
            underlineStyle: {
                borderColor: `#${color}`,
            },
            floatingLabelFocusStyle: {
                color: `#${color}`,
            },
        }

        return (
            <Row className={styles['row-style']} >
                <Col sm={3}>
                    <TextField
                        value={name}
                        hintText="Name"
                        floatingLabelText="Enter name"
                        fullWidth={true}
                        onChange={this.handleNameChange}
                        errorText={errorText}
                    />
                </Col>
                <Col sm={3}>
                    <TextField
                        value={color}
                        floatingLabelText="Enter color"
                        fullWidth={true}
                        hintText="Color"
                        underlineFocusStyle={styleHexColor.underlineStyle}
                        floatingLabelFocusStyle={styleHexColor.floatingLabelFocusStyle}
                        errorText={errorText}
                        onChange={this.handleColorChange}
                    />
                </Col>
                <Col sm={6}>
                    <FlatButton
                        className={styles['flatButtonCancel']}
                        label="Cancel"
                        onTouchTap={this.handleCancleTouchTap}
                    />
                    <FlatButton
                        className={styles['flatButtonUpdateSave']}
                        label={editing  ? "Save" : "Create"}
                        backgroundColor="#17a88c"
                        hoverColor="#1abc9c"
                        onTouchTap={this.handleSaveCreateTouchTap}
                    />
                </Col>
            </Row>
        );
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    handleColorChange = (e) => {
        this.setState({
            color: e.target.value,
        });
    }

    handleCancleTouchTap = () => {
        const { onCancleEdit } = this.props;
        onCancleEdit();
    }

    handleSaveCreateTouchTap = () => {
        const { url, name, color } = this.state;
        const {onCancleEdit, handleUpdateLabel, handleCreateLabel, editing} = this.props;
        const hexValidation = /^[0-9A-F]{6}$/i;
        if (hexValidation.test(color) && name.length > 0) {
            if (editing === true) {
                handleUpdateLabel(url, name, color);
            } else {
                handleCreateLabel(name, color);
            }
            onCancleEdit();
            this.setState({errorText: ''});
        } else {
            this.setState({errorText: 'invalid format'});
        }
    }

}

EditLabelForm.propTypes = propTypes;
EditLabelForm.defaultProps = defaultProps;

export default EditLabelForm;
