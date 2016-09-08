import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';

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

export default class ListOfIssues extends Component {

    render() {
        const { issuesList } = this.props;

        const issuesNode = issuesList.map(issue => {
            const iconStyle = {
                height: 44
            }
            return (
                React.Children.toArray([
                    <hr style={{margin: 0, border: 0, borderBottom: '1px solid #ccc'}} />,

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
                                #{issue.number}{" "}
                                opened by {issue.user.login}.
                            </p>
                        }
                        secondaryTextLines={2}
                        key={issue.id}
                        value={issue}
                        onTouchTap={() => this.handleTouchTap(issue)}
                    />
                ])
            );
        });
        return (
            <SelectableList>
                <Subheader>Issues</Subheader>
                {issuesNode}
            </SelectableList>
        );
    }

    handleTouchTap = (issue) => {
        const { handleChangeCurrentIssue } = this.props;
        handleChangeCurrentIssue(issue);
    }

}

const { array, func } = PropTypes;
ListOfIssues.propTypes = {
    issuesList: array.isRequired,
    handleChangeCurrentIssue: func.isRequired,
}
