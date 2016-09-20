import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import ImageLens from 'material-ui/svg-icons/image/lens';
import styles from './styles.css';

import { getContrastYIQ } from '../../api/format.js';

const {Grid, Row, Col} = require('react-flexbox-grid');

const {arrayOf, shape, object, bool, number, string, func} = PropTypes;
const propTypes = {
    currentIssue: object.isRequired,
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    permission: bool.isRequired,
    updateInProcess: bool.isRequired,
    issuesUpdatingList: arrayOf(number).isRequired,
    addLabelsToAnIssue: func.isRequired,
    removeLabelFromAnIssue: func.isRequired,
    fetchSingleIssueForUpdate: func.isRequired,
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
            openMenu: false,
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
        const {
            currentIssue,
            labelsList,
            permission,
            issuesUpdatingList,
            updateInProcess
        } = this.props;
        const style = {
            stateButton: {
                backgroundColor: currentIssue.state === 'open' ? '#3fb0ac' : '#e74c3c',
                color: 'white'
            }
        }
        const labelNode = currentIssue.labels.map((label, index) => {
            const spanStyle = {
                color: getContrastYIQ(label.color),
                backgroundColor: `#${label.color}`,
                padding: '3px 4px',
                display: 'inline-block',
                marginRight: 8,
                fontWeight: 'normal',
                // fontSize: '16px',
                borderRadius: '2px',
                lineHeight: 1,

            }
            return (
                <span style={spanStyle} key={index}>
                    {label.name}
                </span>
            )
        });
        return (
            <div className={styles['div-wrap']}>
                <Row>
                    <Col sm={11}>
                        <h2>
                            <span style={{marginRight: 8}}>{currentIssue.title.toUpperCase()}</span>
                            {labelNode}
                        </h2>
                    </Col>
                    <Col sm={1}>
                        <IconMenu
                            className={styles['icon-menu']}
                            value={this.state.valueMultiple}
                            iconButtonElement={
                                <IconButton
                                    disabled={
                                        issuesUpdatingList.indexOf(currentIssue.number) !== -1 ||
                                        !permission || updateInProcess
                                    }
                                    tooltip={
                                        issuesUpdatingList.indexOf(currentIssue.number) !== -1
                                            ?   "wait for update"
                                            :   "labels"
                                        }
                                >
                                    <ContentFilter />
                                </IconButton>
                            }
                            open={this.state.openMenu}
                            touchTapCloseDelay={0}
                            onChange={this.handleChangeMultiple}
                            multiple={true}
                            onRequestChange={this.handleRequestChange}
                        >
                            {labelsList.map((label, index) => {
                                return (
                                    <MenuItem
                                        leftIcon={
                                            _.includes(this.state.valueMultiple, index)
                                                ?   <ToggleCheckBox />
                                                :   <ToggleCheckBoxOutlineBlank />
                                        }
                                        rightIcon={
                                            <ImageLens color={`#${label.color}`} />
                                        }
                                        innerDivStyle={{paddingRight: 44}}
                                        primaryText={label.name}
                                        value={index}
                                        key={index}
                                    />
                                );
                            })}
                        </IconMenu>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FlatButton
                            label={currentIssue.state}
                            icon={<AlertErrorOutline />}
                            style={style.stateButton}
                            disabled={true}
                            primary={true}
                        />
                        {currentIssue.comments > 0 &&
                            <FlatButton
                                label={currentIssue.comments}
                                icon={<CommunicationComment />}
                                disabled={true}
                                primary={true}
                            />
                        }

                    </Col>
                    <Col sm={8} style={{ alignItems: 'center'}}>

                    </Col>
                </Row>
            </div>

        );
    }

    handleRequestChange = (value) => {
        const {
            currentIssue,
            labelsList,
            addLabelsToAnIssue,
            removeLabelFromAnIssue,
            fetchSingleIssueForUpdate
        } = this.props;
        let currentLabels = [];
        let updatedLabels = [];
        let labelsToAdd = [];
        let labelsToDelete = [];
        this.setState({openMenu: value});
        if (!value) {
            currentIssue.labels.forEach(label  => currentLabels.push(label.name));
            labelsList.forEach((label, index) => {
                if(this.state.valueMultiple.indexOf(index) !== -1) {
                    updatedLabels.push(label.name);
                }
            });
            if (!_.isEqual(updatedLabels.sort(), currentLabels.sort())) {
                updatedLabels.forEach(label => {
                    if (currentLabels.indexOf(label) === -1) {
                        labelsToAdd.push(label);
                    }
                });
                currentLabels.forEach(label => {
                    if (updatedLabels.indexOf(label) === -1) {
                        labelsToDelete.push(label);
                        removeLabelFromAnIssue(currentIssue.number, label);

                    }
                });
                if (labelsToAdd.length > 0) {
                    addLabelsToAnIssue(currentIssue.number, labelsToAdd);
                }
                fetchSingleIssueForUpdate(currentIssue.number);
            }
            // console.log('current: ', currentLabels);
            // console.log('updated: ', updatedLabels);
            // console.log('toAdd: ', labelsToAdd);
            // console.log('toDlete: ', labelsToDelete);
        }
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
