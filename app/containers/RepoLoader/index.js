import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getRepoList } from './selectors';
import { getUserName, getPassword } from 'containers/AuthorizationBar/selectors';
import ListOfRepos from 'components/ListOfRepos';
let api = require("../../api/restUtilities.js");


class RepoLoader extends Component {

  componentWillReceiveProps(nextProps) {
    const { username, password } = nextProps;
    console.log(username);
    if (username !== this.props.username) {
      api.fetchListYourRepositories(username, password)
        .then(res =>{
          if(res.status !== 200) {
            throw Error('Bad validation');
          }
          return res.json();
        })
        .then(res => {
        this.props.loadRepoListAction(res);
      }).catch(error => console.log(error));
    }
  }
  render() {
    return (
      <ListOfRepos repoList={this.props.repoList} />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  password: getPassword(),
  repoList: getRepoList(),
});

RepoLoader.defaultProps = {
  repoList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoLoader);
