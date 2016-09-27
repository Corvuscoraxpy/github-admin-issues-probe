import React, { Component, PropTypes } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IssueHeader from 'components/IssueHeader';
import IssueCommentForm from 'components/IssueCommentForm';
import styles from './styles.css';
import { formatDate, rawMarkup } from '../../api/format.js';

const {arrayOf, number, shape, bool, string, object, func} = PropTypes;
const propTypes = {
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    userData: object.isRequired,
    listOfComments: arrayOf(object.isRequired).isRequired,
    permission: bool.isRequired,
    updateInProcess: bool.isRequired,
    currentIssue: object.isRequired,
    issuesUpdatingList: arrayOf(number).isRequired,
    createCommentToIssue: func.isRequired,
    addLabelsToAnIssue: func.isRequired,
    removeLabelFromAnIssue: func.isRequired,
    fetchSingleIssueForUpdate: func.isRequired,
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
            updateInProcess,
            permission,
            userData,
            issuesUpdatingList,
            addLabelsToAnIssue,
            removeLabelFromAnIssue,
            fetchSingleIssueForUpdate,
            createCommentToIssue,
        } = this.props;

        const commentsNode = listOfComments.map(comment => {
            return (
                <Card className={styles['card']} key={comment.id}>
                    <CardHeader
                        title={comment.user.login}
                        subtitle={formatDate(comment.created_at)}
                        avatar={
                            <a href={comment.user.html_url} target="_blank">
                                <Avatar src={comment.user.avatar_url} />
                            </a>
                        }
                    />
                    <CardText className={styles['card-text']}>
                        <span
                            className={styles['span-card-text']}
                            dangerouslySetInnerHTML={rawMarkup(comment.body)}
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
                        updateInProcess={updateInProcess}
                        currentIssue={currentIssue}
                        labelsList={labelsList}
                        issuesUpdatingList={issuesUpdatingList}
                        addLabelsToAnIssue={addLabelsToAnIssue}
                        removeLabelFromAnIssue={removeLabelFromAnIssue}
                        fetchSingleIssueForUpdate={fetchSingleIssueForUpdate}
                    />
                }
                {Object.keys(currentIssue).length !== 0 &&
                    <Card className={styles['card']}>
                        <CardHeader
                            title={currentIssue.user.login}
                            subtitle={formatDate(currentIssue.created_at)}
                            avatar={
                                <a href={currentIssue.user.html_url} target="_blank">
                                    <Avatar src={currentIssue.user.avatar_url} />
                                </a>
                            }
                        />
                        <CardText className={styles['card-text']}>
                            <span
                                className={styles['span-card-text']} dangerouslySetInnerHTML={rawMarkup(currentIssue.body)}
                            />
                        </CardText>
                    </Card>
                }
                    {commentsNode}
                    {Object.keys(currentIssue).length !== 0 &&
                        <IssueCommentForm
                            userData={userData}
                            createCommentToIssue={createCommentToIssue}
                        />
                    }
            </div>
        );
    }

}

Issue.propTypes = propTypes;
Issue.defaultProps = defaultProps;

export default Issue;
