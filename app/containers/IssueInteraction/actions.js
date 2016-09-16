import { updateCurrentIssueinListAction } from 'containers/RepoIssues/actions';
let api = require("../../api/restUtilities.js");

export const GET_LIST_COMMENTS_ON_AN_ISSUE = 'GET_LIST_COMMENTS_ON_AN_ISSUE';
export const ADD_TO_ISSUES_UPDATING_LIST = 'ADD_TO_ISSUES_UPDATING_LIST';
export const REMOVE_FROM_ISSUES_UPDATING_LIST = 'REMOVE_FROM_ISSUES_UPDATING_LIST';

const getStateData = (getState) => {
    return [
        getState().get('authorization').authorization,
        getState().get('repositoryLoader').repositoryOwner,
        getState().get('repositoryLoader').selectedRepository,
        getState().get('issueInteraction').issuesUpdatingList,
        getState().get('repoIssues').issuesList,
    ];
}

const getListCommentsOnAnIssueAction = (listOfComments) => ({
    type: 'GET_LIST_COMMENTS_ON_AN_ISSUE',
    listOfComments
});

const addToIssuesUpdatingListAction = (number) => ({
    type: 'ADD_TO_ISSUES_UPDATING_LIST',
    number
});

const removeFromIssuesUpdatingListAction = (index) => ({
    type: 'REMOVE_FROM_ISSUES_UPDATING_LIST',
    index
});

export const fetchListCommentsOnAnIssueAction = (comments_url) => {
    return (dispatch, getState) => {
        const [authorization] = getStateData(getState);
        return api.fetchListCommentsOnAnIssue(authorization, comments_url)
            .then(result => {
                dispatch(getListCommentsOnAnIssueAction(result));
            })
            .catch(err => console.log(err));
    }
}

export const addLabelsToAnIssueAction = (number, name) => {
    return (dispatch, getState) => {
        const [authorization, repositoryOwner, selectedRepository, issuesUpdatingList] = getStateData(getState);
        api.addLabelsToAnIssue(authorization, repositoryOwner, selectedRepository, number, name)
            .then(result => {
                if (result.status === 200) {
                    if(issuesUpdatingList.indexOf(number) === -1) {
                        dispatch(addToIssuesUpdatingListAction(number));
                        dispatch(fetchSingleIssueForUpdateAction(number));
                    }
                }
            })
            .catch(err => console.log(err));
    }
}

export const fetchSingleIssueForUpdateAction = (number) => {
    return (dispatch, getState) => {
        const [
            authorization,
            repositoryOwner,
            selectedRepository,
            issuesUpdatingList,
            issuesList
        ] = getStateData(getState);
        api.fetchSingleIssue(authorization, repositoryOwner, selectedRepository, number)
            .then(issue => {
                if(!_.isEqual(issuesList[issuesList.length - number].labels, issue.labels)) {
                    dispatch(removeFromIssuesUpdatingListAction(issuesUpdatingList.indexOf(number)));
                    dispatch(updateCurrentIssueinListAction(issue));
                } else {
                    setTimeout(() => {
                        dispatch(fetchSingleIssueForUpdateAction(number));
                    }, 1000);
                }
            })
            .catch(err => console.log(err));
    }
}

export const removeLabelFromAnIssueAction = (number, name) => {
    return (dispatch, getState) => {
        const [authorization, repositoryOwner, selectedRepository, issuesUpdatingList] = getStateData(getState);
        api.removeLabelFromAnIssue(authorization, repositoryOwner, selectedRepository, number, name)
            .then(result => {
                if(result.status === 404) {
                    throw Error('Not found, let add it');
                } else if (result.status == 200) {
                    if(issuesUpdatingList.indexOf(number) === -1) {
                        dispatch(addToIssuesUpdatingListAction(number));
                        dispatch(fetchSingleIssueForUpdateAction(number));
                    }
                }
            })
            .catch(err => {
                //console.log(err);
                dispatch(addLabelsToAnIssueAction(number, name));
            });
    }
}
