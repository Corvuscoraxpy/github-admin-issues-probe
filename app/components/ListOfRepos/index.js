import React, { Component, PropType } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class ListOfRepos extends Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  handleChange = (event, index, value) => {
    const { selectRepoAction } = this.props;
    this.setState({value});
    selectRepoAction(value);
  };

  render() {
    const { repoList } = this.props;
    const listNodes = repoList.map((repoObj, index) => {
      return(
        <MenuItem
          primaryText={repoObj.name}
          key={index}
          value={repoObj.name}
        />
      );
    });

    return (
      <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Select the repository"
          floatingLabelStyle={{color: 'orange'}}
        >
          {listNodes}
      </SelectField>
    );
  }
}
