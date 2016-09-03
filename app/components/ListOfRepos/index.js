import React, { Component, PropType } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const {Grid, Row, Col} = require('react-flexbox-grid');


export default class ListOfRepos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      repoOwner: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.repoOwner === '') {
      this.setState({ repoOwner: nextProps.username});
      this.props.selectRepoOwnerAction(nextProps.username);
    }
  }
  handleChange = (event, index, value) => {
    const { selectRepoAction } = this.props;
    this.setState({value});
    selectRepoAction(value);
  };

  handleRepoOwnerChange = (e) => {
    this.setState({
      repoOwner: e.target.value,
    });
  }

  handleEnterKeyDown = (e) => {
    const { selectRepoOwnerAction } = this.props;
    if(e.keyCode == 13) {
      selectRepoOwnerAction(this.state.repoOwner);
    }
  }

  render() {
    const styles = {
      rowStyle : {
        padding: 0,
        margin: 0,
      },
    }
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
      <Row style={styles.rowStyle}>
        <Col sm={5}>
          <TextField
            fullWidth={true}
            hintText="Repository owner"
            value={this.state.repoOwner}
            floatingLabelText="Enter repo owner"
            floatingLabelStyle={{color: 'orange'}}
            onChange={this.handleRepoOwnerChange}
            onKeyDown={this.handleEnterKeyDown}
          />
        </Col>
        <Col sm={7}>
          <SelectField
            fullWidth={true}
            value={this.state.value}
            onChange={this.handleChange}
            floatingLabelText="Select the repository"
            floatingLabelStyle={{color: 'orange'}}
          >
            {listNodes}
          </SelectField>
        </Col>
      </Row>
    );
  }
}
