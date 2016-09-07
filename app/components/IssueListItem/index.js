import React, {Component, PropTypes} from 'react';
import {ListItem} from 'material-ui/List';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

export default class IssueListItem extends Component {
    render() {
        const iconStyle = {
            height: 44
        }
        const { issue } = this.props;
        return (
            <ListItem
                leftIcon={
                    <AlertErrorOutline
                        style={iconStyle}
                        color={issue.state === 'open' ? '#17a88c' : '#e74c3c'}
                    />
                }
                primaryText={issue.title}
                secondaryText={
                    <p>
                        <span style={{color: darkBlack}}>
                            #{issue.number}
                        </span>
                        opened by {issue.user.login}.
                    </p>
                }
                secondaryTextLines={2}
                onTouchTap={() => this.handleTouchTap(issue)}
            />
        );
    }
    handleTouchTap = (issue) => {
        const { handleChangeCurrentIssue } = this.props;
        handleChangeCurrentIssue(issue);
    }
}

const { object, func } = PropTypes;
IssueListItem.propTypes = {
    issue: object.isRequired,
    handleChangeCurrentIssue: func.isRequired,
}
