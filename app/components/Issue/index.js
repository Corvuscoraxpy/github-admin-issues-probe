import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
const Remarkable = require('remarkable');
const hljs = require('highlight.js');
const {Grid, Row, Col} = require('react-flexbox-grid');

export default class Issue extends Component {

  rawMarkup = (body) => {
        let md = new Remarkable('full', {
          langPrefix:   '',
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value;
              } catch (err) {}
            }

            try {
              return hljs.highlightAuto(str).value;
            } catch (err) {}

            return ''; // use external default escaping
          }
        });

        if (body){
          let rawMarkup = md.render(body.toString());
          return { __html: rawMarkup};
        } else return;
    }


  render() {
    const { currentIssue, listOfComments } = this.props;

    const commentsNode = listOfComments.map((comment, index) => {
      return (
        <Card>
          <CardHeader
            title={comment.user.login}
            subtitle={`created at: ${comment.created_at}`}
            avatar={ comment.user.avatar_url}
          />
          <CardActions>
            <FlatButton label="EDIT" />
            {/* <FlatButton label="Action2" /> */}
          </CardActions>
        <CardText>
          <span dangerouslySetInnerHTML={this.rawMarkup(comment.body)}/>
        </CardText>
      </Card>
      );
    });
    return (
      <div>
      <Card>
        <CardHeader
          title={currentIssue.title}
          subtitle={`status: ${currentIssue.state} · comments: ${currentIssue.comments} ` }
          avatar={Object.keys(currentIssue).length !== 0 ? currentIssue.user.avatar_url : "" }
        />
        <CardActions>
          <FlatButton label="EDIT" />
          {/* <FlatButton label="Action2" /> */}
        </CardActions>
      <CardText>
        <span dangerouslySetInnerHTML={this.rawMarkup(currentIssue.body)}/>
      </CardText>
    </Card>
    {commentsNode}
    </div>

    );
  }
}
