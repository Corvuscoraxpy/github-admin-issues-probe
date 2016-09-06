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
