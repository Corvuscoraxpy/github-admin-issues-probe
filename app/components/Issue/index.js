import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IssueHeader from 'components/IssueHeader';
import styles from './styles.css';
const Remarkable = require('remarkable');
const hljs = require('highlight.js');

const {arrayOf, shape, bool, string, object, func} = PropTypes;
const propTypes = {
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    listOfComments: arrayOf(object.isRequired).isRequired,
    permission: bool.isRequired,
    currentIssue: object.isRequired,
    onRemoveOrAddLabelFromAnIssue: func.isRequired,
};

const defaultProps = {
    labelsList: [{name: '', color: ''}],
    listOfComments: [],
    currentIssue: {},
};

class Issue extends Component {

    render() {
        const {
            currentIssue,
            listOfComments,
            labelsList,
            permission,
            onRemoveOrAddLabelFromAnIssue,
        } = this.props;

        const commentsNode = listOfComments.map(comment => {
            return (
                <Card className={styles['card-style']} key={comment.id}>
                    <CardHeader
                        title={comment.user.login}
                        subtitle={this.formatDate(comment.created_at)}
                        avatar={comment.user.avatar_url}
                    />
                    <CardText>
                        <span dangerouslySetInnerHTML={this.rawMarkup(comment.body)}/>
                    </CardText>
                </Card>
            );
        });

        return (
            <div className={styles['div-wrap']}>
                <IssueHeader
                    permission={permission}
                    currentIssue={currentIssue}
                    labelsList={labelsList}
                    onRemoveOrAddLabelFromAnIssue={onRemoveOrAddLabelFromAnIssue}
                />
                <Card className={styles['card-style']}>
                    <CardHeader
                        title={Object.keys(currentIssue).length !== 0 ? currentIssue.user.login : ""}
                        subtitle={this.formatDate(currentIssue.created_at)}
                        avatar={Object.keys(currentIssue).length !== 0 ? currentIssue.user.avatar_url : "" }
                    />
                    <CardText>
                        <span dangerouslySetInnerHTML={this.rawMarkup(currentIssue.body)}/>
                    </CardText>
                </Card>
                {commentsNode}
            </div>
        );
    }

    rawMarkup = (body) => {
        let md = new Remarkable('full', {
            langPrefix: '',
            html: true,
            breaks: true,
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

        if (body) {
            let rawMarkup = md.render(body.toString());
            return { __html: rawMarkup};
        } else return;
    }

    formatDate = (time) => {
        const date = new Date(time),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

        if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 365 )
            return;

        return day_diff == 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
            day_diff == 1 && "Yesterday" ||
            day_diff < 7 && day_diff + " days ago" ||
            day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
            day_diff < 365 && Math.ceil( day_diff / 31) + " months ago";
    }
}

Issue.propTypes = propTypes;
Issue.defaultProps = defaultProps;

export default Issue;
