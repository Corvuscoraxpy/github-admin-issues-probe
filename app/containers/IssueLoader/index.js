import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getSelectedRepo } from 'containers/RepoLoader/selectors';
import { getUserName } from 'containers/AuthorizationBar/selectors';

import ListOfRepos from 'components/ListOfRepos';
let api = require("../../api/restUtilities.js");

class IssueLoader extends Component {
  render() {
    return (

    );
  }
}
