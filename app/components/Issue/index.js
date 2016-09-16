import React, { Component, PropTypes } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IssueHeader from 'components/IssueHeader';
import styles from './styles.css';
import { formatDate } from '../../api/format.js';
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
                <Card className={styles['card']} key={comment.id}>
                    <CardHeader
                        title={comment.user.login}
                        subtitle={formatDate(comment.created_at)}
                        avatar={comment.user.avatar_url}
                    />
                    <CardText className={styles['card-text']}>
                        <span
                            className={styles['span-card-text']}
                            dangerouslySetInnerHTML={this.rawMarkup(comment.body)}
                        />
                    </CardText>
                </Card>
            );
        });
        return (
            <div className={styles['div-wrap']}>
                {Object.keys(currentIssue).length !== 0 &&
                    <IssueHeader
                        permission={permission}
                        currentIssue={currentIssue}
                        labelsList={labelsList}
                        onRemoveOrAddLabelFromAnIssue={onRemoveOrAddLabelFromAnIssue}
                    />
                }
                {Object.keys(currentIssue).length !== 0 &&
                    <Card className={styles['card']}>
                        <CardHeader
                            title={currentIssue.user.login}
                            subtitle={formatDate(currentIssue.created_at)}
                            avatar={currentIssue.user.avatar_url}
                        />
                        <CardText className={styles['card-text']}>
                            <span
                                className={styles['span-card-text']} dangerouslySetInnerHTML={this.rawMarkup(currentIssue.body)}
                            />
                        </CardText>
                    </Card>
                }
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
}

Issue.propTypes = propTypes;
Issue.defaultProps = defaultProps;

export default Issue;
