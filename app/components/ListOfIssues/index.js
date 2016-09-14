import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';

const { arrayOf, object, string, func } = PropTypes;
const propTypes = {
    issuesList: arrayOf(object.isRequired).isRequired,
    handleChangeCurrentIssue: func.isRequired,
};

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

    componentWillReceiveProps(nextProps) {
        const { handleChangeCurrentIssue, issuesList } = this.props;

        if (nextProps.issuesList && nextProps.issuesList.length > 0 &&
            nextProps.issuesList !== issuesList) {
                if ((issuesList && issuesList.length > 0 &&
                    issuesList[0].repository_url !== nextProps.issuesList[0].repository_url) ||
                    issuesList.length === 0) {

                        handleChangeCurrentIssue(nextProps.issuesList[0]);
                    }
        }
    }

    render() {
        const { issuesList } = this.props;
        const issuesNode = issuesList.map((issue, index) => {
            const iconStyle = {
                height: 44
            }
            const labelNode = issue.labels.map(label => {
                const spanStyle = {
                    color: getContrastYIQ(label.color),
                    backgroundColor: `#${label.color}`,
                    padding: '3px 4px',
                    display: 'inline-block',
                    marginRight: 4,
                    fontSize: '12px',
                    borderRadius: '2px',
                    lineHeight: 1,

                }
                return (
                    <span style={spanStyle}>
                        {label.name}
                    </span>
                )
            });
            return (
                <ListItem
                    style={{lineHeight: 1.6, wordWrap: 'break-word'}}
                    leftIcon={
                        <AlertErrorOutline
                            style={iconStyle}
                            color={issue.state === 'open' ? '#17a88c' : '#e74c3c'}
                        />
                    }
                    rightIcon={
                        issue.comments > 0 ?
                            <CommunicationComment color="#9E9E9E" /> : null
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
        });
        const notification = <span style={{color: '#17a88c', paddingLeft: '16px'}}>Please, select repository with issues!</span>;
        return (
            <SelectableList defaultValue={0}>
                <Subheader>{issuesNode.length > 0 ? "Issues" : notification}</Subheader>
                {issuesNode}
            </SelectableList>
        );
    }

    handleTouchTap = (issue) => {
        const { handleChangeCurrentIssue } = this.props;
        handleChangeCurrentIssue(issue);
    }

}

const getContrastYIQ = (hexcolor) => {
	let r = parseInt(hexcolor.substr(0,2),16);
	let g = parseInt(hexcolor.substr(2,2),16);
	let b = parseInt(hexcolor.substr(4,2),16);
	let yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

ListOfIssues.propTypes = propTypes;

export default ListOfIssues;
