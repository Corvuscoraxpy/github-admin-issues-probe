let api = require("../../api/restUtilities.js");

export const GET_LIST_COMMENTS_ON_AN_ISSUE = 'GET_LIST_COMMENTS_ON_AN_ISSUE';

const getListCommentsOnAnIssueAction = (listOfComments) => ({
    type: 'GET_LIST_COMMENTS_ON_AN_ISSUE',
    listOfComments
});

export const fetchListCommentsOnAnIssueAction = (comments_url) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        return api.fetchListCommentsOnAnIssue(authorization, comments_url)
            .then(result => {
                dispatch(getListCommentsOnAnIssueAction(result));
            })
            .catch(err => console.log(err));
    }
}

export const addLabelsToAnIssueAction = (number, name) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const repositoryOwner = getState().get('repositoryLoader').repositoryOwner;
        const selectedRepository = getState().get('repositoryLoader').selectedRepository;
        api.addLabelsToAnIssue(authorization, repositoryOwner, selectedRepository, number, name)
            .then(result => console.log(result.status))
            .catch(err => console.log(err));
    }
}

export const removeLabelFromAnIssueAction = (number, name) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const repositoryOwner = getState().get('repositoryLoader').repositoryOwner;
        const selectedRepository = getState().get('repositoryLoader').selectedRepository;
        api.removeLabelFromAnIssue(authorization, repositoryOwner, selectedRepository, number, name)
            .then(result => {
                if(result.status === 404) {
                    throw Error('Not found');
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(addLabelsToAnIssueAction(number, name));
            });
    }
}
