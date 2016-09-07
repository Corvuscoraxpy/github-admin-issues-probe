import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
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

        console.log(issuesList);
        const issuesNode = issuesList.map(issue => {
            const iconStyle = {
                height: 44
            }
            return (
                React.Children.toArray([
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
                                    #{issue.number}{" "}
                                </span>
                                opened by {issue.user.login}.
                        </p>
                        }
                        secondaryTextLines={2}
                        key={issue.id}
                        value={issue}
                        onTouchTap={() => this.handleTouchTap(issue)}
                    />,
                    <Divider />
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

ListOfIssues.propTypes = {
    issuesList: PropTypes.array,
    handleChangeCurrentIssue: PropTypes.func,
}
