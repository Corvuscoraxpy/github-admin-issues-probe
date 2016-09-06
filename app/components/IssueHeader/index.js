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

export default class IssueHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueMultiple: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Fly prop current: ', nextProps.currentIssue.labels);
        if (Object.keys(nextProps.labelsList).length >= 0 &&
            Object.keys(nextProps.currentIssue.labels).length >= 0) {
            let array = nextProps.labelsList.map((label, index) => {
                let result;
                nextProps.currentIssue.labels.forEach(labelInIssue => {
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
        console.log(currentIssue.labels);

        return (
            <Paper style={{marginBottom: '8px', padding: '1em'}}>
                <Row>
                    <Col sm={10}>
                        <h2>{currentIssue.title}</h2>
                    </Col>
                    <Col sm={2}>
                        <IconMenu
                            iconButtonElement={<IconButton><ContentFilter /></IconButton>}
                            onChange={this.handleChangeMultiple}
                            value={this.state.valueMultiple}
                            multiple={true}
                            onItemTouchTap={this.handleOnItemTouchTap}
                            style={{marginTop: '20px'}}
                        >
                            {labelsList.map((label, index) => {
                                return (
                                    <MenuItem key={index} value={index} primaryText={label.name} />
                                );
                            })}
                        </IconMenu>
                    </Col>
                </Row>
                <FlatButton
                    disabled={true}
                    label={currentIssue.state}
                    primary={true}
                    style={styles.button}
                    icon={<AlertErrorOutline />}
                />
                <FlatButton
                    disabled={true}
                    label={currentIssue.comments}
                    primary={true}
                    icon={<CommunicationComment />}
                />
            </Paper>
        );
    }

    handleOnItemTouchTap = (e, child) => {
        const { onRemoveOrAddLabelFromAnIssue, currentIssue } = this.props;
        const name = child.props.primaryText;
        const number = child.key;
        console.log(child);
        onRemoveOrAddLabelFromAnIssue(currentIssue.number, name);
    }

    handleChangeMultiple = (event, value) => {
        this.setState({
            valueMultiple: value,
        });
    };
}

IssueHeader.propTypes = {
    currentIssue: PropTypes.object,
    labelsList: PropTypes.array,
    onRemoveOrAddLabelFromAnIssue: PropTypes.func,
};
