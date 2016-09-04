import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const {Grid, Row, Col} = require('react-flexbox-grid');

export default class EditLabelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: this.props.label.color,
            name: this.props.label.name,
            url: this.props.label.url,
        };
    }

    render() {
        const styles = {
            underlineStyle: {
                borderColor: `#${this.state.color}`,
            },
            floatingLabelFocusStyle: {
                color: `#${this.state.color}`,
            },
            rowStyle : {
                padding: 0,
                margin: 0,
            },
        }

        return (
            <Row style={styles.rowStyle} >
                <Col sm={3}>
                    <TextField
                        fullWidth={true}
                        hintText="Name"
                        value={this.state.name}
                        floatingLabelText="Enter name"
                        onChange={this.handleNameChange}
                    />
                </Col>
                <Col sm={3}>
                    <TextField
                        fullWidth={true}
                        hintText="Color"
                        value={this.state.color}
                        floatingLabelText="Enter color"
                        onChange={this.handleColorChange}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                </Col>
                <Col sm={3}>
                    <FlatButton
                        style={{marginTop: '2em'}}
                        label="Cancel"
                        onTouchTap={this.handleCancleTouchTap}
                    />
                </Col>
                <Col sm={3}>
                    <FlatButton
                        style={{marginTop: '2em'}}
                        label="Save"
                        onTouchTap={this.handleSaveTouchTap}
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

    handleSaveTouchTap = () => {
        const { url, name, color } = this.state;
        const {onCancleEdit, handleUpdateLabel} = this.props;
        handleUpdateLabel(url, name, color);
        onCancleEdit();
    }

}

EditLabelForm.propTypes = {
    label: PropTypes.object,
    onCancleEdit: PropTypes.func,
    handleUpdateLabel: PropTypes.func,
};
