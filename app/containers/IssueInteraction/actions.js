import { updateCurrentIssueinListAction, changeCurrentIssueAction } from 'containers/RepoIssues/actions';
let api = require("../../api/restUtilities.js");

export const GET_LIST_COMMENTS_ON_AN_ISSUE = 'GET_LIST_COMMENTS_ON_AN_ISSUE';
export const ADD_TO_ISSUES_UPDATING_LIST = 'ADD_TO_ISSUES_UPDATING_LIST';
export const REMOVE_FROM_ISSUES_UPDATING_LIST = 'REMOVE_FROM_ISSUES_UPDATING_LIST';

const getStateData = (getState) => ({
    authorization: getState().get('authorization').authorization,
    repositoryOwner: getState().get('repositoryLoader').repositoryOwner,
    selectedRepository: getState().get('repositoryLoader').selectedRepository,
    issuesUpdatingList: getState().get('issueInteraction').issuesUpdatingList,
    issuesList: getState().get('repoIssues').issuesList,
    currentIssue: getState().get('repoIssues').currentIssue,
    labelsList: getState().get('repoLabels').labelsList,
    selectedRepository: getState().get('repositoryLoader').selectedRepository,
    listOfComments: getState().get('issueInteraction').listOfComments,
});

const getListCommentsOnAnIssueAction = (listOfComments) => ({
    type: 'GET_LIST_COMMENTS_ON_AN_ISSUE',
    listOfComments
});


const removeFromIssuesUpdatingListAction = (index) => ({
    type: 'REMOVE_FROM_ISSUES_UPDATING_LIST',
    index
});

export const addToIssuesUpdatingListAction = (number) => ({
    type: 'ADD_TO_ISSUES_UPDATING_LIST',
    number
});

export const fetchListCommentsOnAnIssueAction = (comments_url, update = false) => {
    return (dispatch, getState) => {
        const { authorization, listOfComments, currentIssue, issuesUpdatingList } = getStateData(getState);
        api.fetchListCommentsOnAnIssue(authorization, comments_url)
            .then(result => {
                if (update) {
                    if(listOfComments.length < result.length) {
                        dispatch(getListCommentsOnAnIssueAction(result));
                        dispatch(removeFromIssuesUpdatingListAction(issuesUpdatingList.indexOf(currentIssue.number)));
                    } else {
                        dispatch(fetchListCommentsOnAnIssueAction(currentIssue.comments_url, true));
                    }
                }
                if (!update) {
                    dispatch(getListCommentsOnAnIssueAction(result));
                }
            })
            .catch(err => console.log(err));
    }
}

export const createCommentAction = (comment) => {
    return (dispatch, getState) => {
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            currentIssue
        } = getStateData(getState);
        api.createComment(authorization, repositoryOwner, selectedRepository, currentIssue.number, comment)
            .then(result => {
                console.log('responce?:', result.status);
                // Status: Created
                if(result.status === 201) {
                    console.log(result.status, 'booom!');
                    dispatch(addToIssuesUpdatingListAction(currentIssue.number));
                    dispatch(fetchListCommentsOnAnIssueAction(currentIssue.comments_url, true));
                }
            })
            .catch(err => console.log(err));
    }
}

export const addLabelsToAnIssueAction = (number, labelsToAdd) => {
    return (dispatch, getState) => {
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            issuesUpdatingList
        } = getStateData(getState);

        api.addLabelsToAnIssue(authorization, repositoryOwner, selectedRepository, number, labelsToAdd)
            .catch(err => console.log(err));
    }
}

export const fetchSingleIssueForUpdateAction = (number) => {
    return (dispatch, getState) => {
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            issuesUpdatingList,
            issuesList,
            currentIssue,
            labelsList,
        } = getStateData(getState);

        // fetch single issue can return issues with deleted labels. check it.
        const repoLabelsNames = labelsList.map(el => el.name);
        let actualLabels = [];
        api.fetchSingleIssue(authorization, repositoryOwner, selectedRepository, number)
            .then(issue => {
                if (issue.labels.length > 0) {
                    actualLabels = issue.labels.map(el => repoLabelsNames.includes(el.name));
                }

                if (!_.isEqual(issuesList[issuesList.length - number].labels.sort(), issue.labels.sort()) &&
                    !!actualLabels && !actualLabels.includes(false)) {

                    dispatch(removeFromIssuesUpdatingListAction(issuesUpdatingList.indexOf(number)));
                    dispatch(updateCurrentIssueinListAction(issue));

                    if (currentIssue.number === issue.number) {
                        dispatch(changeCurrentIssueAction(issue));
                    }
                } else {
                    setTimeout(() => {
                        dispatch(fetchSingleIssueForUpdateAction(number));
                    }, 2000);
                }
            })
            .catch(err => console.log(err));
    }
}

export const removeLabelFromAnIssueAction = (number, name) => {
    return (dispatch, getState) => {
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            issuesUpdatingList
        } = getStateData(getState);

        api.removeLabelFromAnIssue(authorization, repositoryOwner, selectedRepository, number, name)
            .catch(err => {
                console.log(err);
            });
    }
}
