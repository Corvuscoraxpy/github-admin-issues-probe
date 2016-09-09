import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';

const {Grid, Row, Col} = require('react-flexbox-grid');

const {arrayOf, shape, object, string, func} = PropTypes;
const propTypes = {
    currentIssue: object.isRequired,
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    onRemoveOrAddLabelFromAnIssue: func.isRequired,
};

const defaultProps = {
    currentIssue: {},
    labelsList: [],
};

class IssueHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueMultiple: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        const { labelsList, currentIssue } = nextProps;
        if (Object.keys(labelsList).length >= 0 &&
            Object.keys(currentIssue.labels).length >= 0) {
            let array = labelsList.map((label, index) => {
                let result;
                currentIssue.labels.forEach(labelInIssue => {
                    if (label.name === labelInIssue.name) {
                        result = index;
                    }
                });
                return result;
            });
            this.setState({valueMultiple: array});
        }
    }


    render() {
        const { currentIssue, labelsList } = this.props;
        const styles = {
            button: {
                backgroundColor: currentIssue.state === 'open' ? '#17a88c' : '#e74c3c',
                color: 'white'
            }
        }

        return (
            <Paper style={{marginBottom: '8px', padding: '1em'}}>
                <Row>
                    <Col sm={10}>
                        <h2>{currentIssue.title}</h2>
                    </Col>
                    <Col sm={2}>
                        <IconMenu
                            value={this.state.valueMultiple}
                            iconButtonElement={<IconButton><ContentFilter /></IconButton>}
                            onChange={this.handleChangeMultiple}
                            multiple={true}
                            onItemTouchTap={this.handleOnItemTouchTap}
                            style={{marginTop: '20px'}}
                        >
                            {labelsList.map((label, index) => {
                                return (
                                    <MenuItem
                                        primaryText={label.name}
                                        value={index}
                                        key={index}
                                    />
                                );
                            })}
                        </IconMenu>
                    </Col>
                </Row>
                <FlatButton
                    label={currentIssue.state}
                    icon={<AlertErrorOutline />}
                    style={styles.button}
                    disabled={true}
                    primary={true}
                />
                <FlatButton
                    label={currentIssue.comments}
                    icon={<CommunicationComment />}
                    disabled={true}
                    primary={true}
                />
            </Paper>
        );
    }

    handleOnItemTouchTap = (e, child) => {
        const { onRemoveOrAddLabelFromAnIssue, currentIssue } = this.props;
        const name = child.props.primaryText;
        const number = child.key;
        onRemoveOrAddLabelFromAnIssue(currentIssue.number, name);
    }

    handleChangeMultiple = (event, value) => {
        this.setState({
            valueMultiple: value,
        });
    };
}

IssueHeader.propTypes = propTypes;
IssueHeader.defaultProps = defaultProps;

export default IssueHeader;
