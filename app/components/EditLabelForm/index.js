import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.css';
const {Grid, Row, Col} = require('react-flexbox-grid');



export default class EditLabelForm extends Component {

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
            <Row className={styles['rowStyle']} >
                <Col sm={3}>
                    <TextField
                        fullWidth={true}
                        errorText={errorText}
                        hintText="Name"
                        value={name}
                        floatingLabelText="Enter name"
                        onChange={this.handleNameChange}
                    />
                </Col>
                <Col sm={3}>
                    <TextField
                        fullWidth={true}
                        hintText="Color"
                        value={color}
                        errorText={errorText}
                        floatingLabelText="Enter color"
                        onChange={this.handleColorChange}
                        underlineFocusStyle={styleHexColor.underlineStyle}
                        floatingLabelFocusStyle={styleHexColor.floatingLabelFocusStyle}
                    />
                </Col>
                <Col sm={3}>
                    <FlatButton
                        className={styles['flatButtonCancel']}
                        label="Cancel"
                        onTouchTap={this.handleCancleTouchTap}
                    />
                </Col>
                <Col sm={3}>
                    <FlatButton
                        className={styles['flatButtonUpdateSave']}
                        label={editing  ? "Save" : "Create"}
                        onTouchTap={this.handleSaveCreateTouchTap}
                        backgroundColor="#17a88c"
                        hoverColor="#1abc9c"
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
        } else this.setState({errorText: 'invalid format'});
    }

}

EditLabelForm.propTypes = {
    editing: PropTypes.bool,
    label: PropTypes.object,
    onCancleEdit: PropTypes.func,
    handleUpdateLabel: PropTypes.func,
    handleCreateLabel: PropTypes.func,
};
