import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { getContrastYIQ } from '../../api/format.js';

const { arrayOf, object, string, func } = PropTypes;
const propTypes = {
    issuesList: arrayOf(object.isRequired).isRequired,
    handleChangeCurrentIssue: func.isRequired,
};

const SORT_VALUES = ['all', 'open', 'closed'];
let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number,
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        componentWillReceiveProps(nextProps) {
            const { defaultValue, handleRepositoryChanged } = this.props;
            if(nextProps.repositoryChanged === true) {
                this.setState({selectedIndex: this.props.defaultValue});
                handleRepositoryChanged();
            }
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class ListOfIssues extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repositoryChanged: false,
            pullRequest: false,
            sortValue: 'all',
        }
    };

    componentWillReceiveProps(nextProps) {
        const { handleChangeCurrentIssue, issuesList } = this.props;

        if (nextProps.issuesList && nextProps.issuesList.length > 0 &&
            nextProps.issuesList !== issuesList) {
                if ((issuesList && issuesList.length > 0 &&
                    issuesList[0].repository_url !== nextProps.issuesList[0].repository_url) ||
                    issuesList.length === 0) {
                        handleChangeCurrentIssue(nextProps.issuesList[0]);
                        this.setState({repositoryChanged: true});
                    }
        }
    }

    render() {
        const { issuesList } = this.props;
        const issuesNode = issuesList.map((issue, index) => {
            const iconStyle = {
                height: 44
            }
            const labelNode = issue.labels.map(({name, color}, index) => {
                const spanStyle = {
                    color: getContrastYIQ(color),
                    backgroundColor: `#${color}`,
                    padding: '3px 4px',
                    display: 'inline-block',
                    marginRight: 4,
                    fontSize: '12px',
                    borderRadius: '2px',
                    lineHeight: 1,

                }
                return (
                    <span style={spanStyle} key={index}>
                        {name}
                    </span>
                )
            });
            const issueListItem = (
                <ListItem
                    style={{lineHeight: 1.6, wordWrap: 'break-word'}}
                    leftIcon={
                        <AlertErrorOutline
                            style={iconStyle}
                            color={issue.state === 'open' ? '#3fb0ac' : '#e74c3c'}
                        />
                    }
                    rightIcon={
                        issue.comments > 0
                            ?   <CommunicationComment color="#9E9E9E" />
                            :   null
                    }
                    primaryText={
                        <span>
                            {issue.title} {labelNode}
                        </span>}
                    secondaryText={
                        <p>
                            #{issue.number}{" "}
                            opened by {issue.user.login}.
                        </p>
                    }
                    secondaryTextLines={1}
                    key={issue.id}
                    value={index}
                    onTouchTap={() => this.handleTouchTap(issue)}
                />
            );
            //console.log(!!issue.pull_request);
            if (!!issue.pull_request === this.state.pullRequest) {
                if (this.state.sortValue === 'all') {
                    return issueListItem;
                } else if (issue.state === this.state.sortValue) {
                    return issueListItem;
                }
            }
        });
        const notification = (
            <span style={{color: '#3fb0ac', paddingLeft: '16px'}}>
                Please, select repository with issues!
            </span>
        );
        const showPullRequestAnchor = (
            <a
                style={{
                    textDecoration: 'none',
                    color: this.state.pullRequest ? '#3fb0ac' : '#e74c3c',
                }}
                href="#"
                onClick={this.handleAcnchorClick}
            >
                Show pull requests
            </a>
        );
        return (
            <SelectableList
                defaultValue={0}
                repositoryChanged={this.state.repositoryChanged}
                handleRepositoryChanged={this.handleRepositoryChanged}
            >
                <Subheader>
                    {issuesNode.length > 0 ? showPullRequestAnchor : notification}
                    {issuesNode.length > 0 &&
                        <DropDownMenu
                            style={{float: 'right'}}
                            underlineStyle={{border: 'none'}}
                            value={this.state.sortValue}
                            onChange={this.handleChangeSortValue}
                        >
                            {SORT_VALUES.map((value, index) => {
                                return (
                                    <MenuItem key={index} value={value} primaryText={value} />
                                );
                            })}
                        </DropDownMenu>
                    }
                </Subheader>
                {issuesNode}
            </SelectableList>
        );
    }

    handleTouchTap = (issue) => {
        const { handleChangeCurrentIssue } = this.props;
        handleChangeCurrentIssue(issue);
    }

    handleRepositoryChanged = () => {
        this.setState({repositoryChanged: false});
    }

    handleChangeSortValue = (event, index, value) => this.setState({sortValue: value});

    handleAcnchorClick = () => this.setState({pullRequest: !this.state.pullRequest});

}

ListOfIssues.propTypes = propTypes;

export default ListOfIssues;
