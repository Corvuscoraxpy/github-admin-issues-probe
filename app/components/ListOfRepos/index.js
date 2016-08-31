import React, { Component, PropType } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const items = [
  <MenuItem key={1} value={1} primaryText="Never" />,
  <MenuItem key={2} value={2} primaryText="Every Night" />,
  <MenuItem key={3} value={3} primaryText="Weeknights" />,
  <MenuItem key={4} value={4} primaryText="Weekends" />,
  <MenuItem key={5} value={5} primaryText="Weekly" />,
];

export default class ListOfRepos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const listNodes = this.props.repoList.map((repoObj, index) => {
      return(
        <ListItem
          primaryText={repoObj.name}
          secondaryText={repoObj.language}
        />
        //<Divider />
      );
    });
    return (
      <List>
        <Subheader>Repositories</Subheader>
        {listNodes}
      </List>
    );
  }
}
