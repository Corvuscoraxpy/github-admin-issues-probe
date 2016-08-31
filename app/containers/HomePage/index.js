/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import AuthorizationBar from 'containers/AuthorizationBar';

import RepoLoader from 'containers/RepoLoader';

let api = require("../../api/restUtilities.js");

const {Grid, Row, Col} = require('react-flexbox-grid');

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    api.fetchListYourRepositories('Corvuscoraxpy', 'Coraxcorv8').then(res =>{
      console.log(res.status);
      return res.json();
    }).then(res => console.log(res));
    //api.fetchRegistration();
    //api.fetchPostIssue();
    //window.open('https://github.com/login/oauth/authorize?client_id=9601f1da5dcbbfb9e9bb');
    return (
      <Grid style={{width: '100%'}}>
        <Row style={{margin: 0}}>
          <Col sm={12} style={{padding: 0, height: '10vh'}}>
            <AuthorizationBar/>
          </Col>
        </Row>
        <Row style={{margin: 0}}>
          <Col lg={4} style={{padding: 0, height: '90vh'}}>
            <Paper style={{width: '100%', height: '90vh', overflow: 'auto'}} zDepth={1}>
              <RepoLoader />
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
