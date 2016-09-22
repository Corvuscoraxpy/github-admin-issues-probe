const api = require("../../api/restUtilities.js");
const parse = require('parse-link-header');

export const LOAD_ISSUES_FOR_REPO = 'LOAD_ISSUES_FOR_REPO';
export const CHANGE_CURRENT_ISSUE = 'CHANGE_CURRENT_ISSUE';
export const SET_PAGINATION = 'SET_PAGINATION';
export const APPEND_PAGE_TO_ISSUES = 'APPEND_PAGE_TO_ISSUES';
export const UPDATE_CURRENT_ISSUE_IN_LIST = 'UPDATE_CURRENT_ISSUE_IN_LIST';

const getStateData = (getState) => ({
    authorization: getState().get('authorization').authorization,
    currentIssue: getState().get('repoIssues').currentIssue,
});

const loadIssuesForRepoAction = (issuesList) => ({
  type: 'LOAD_ISSUES_FOR_REPO',
  issuesList
});

export const updateCurrentIssueinListAction = (currentIssue) => ({
    type: 'UPDATE_CURRENT_ISSUE_IN_LIST',
    currentIssue
});

export const appendPageToIssuesList = ( pageList ) => ({
    type: 'APPEND_PAGE_TO_ISSUES',
    pageList
});

export const setPaginationAction = (pagination) => ({
    type: 'SET_PAGINATION',
    pagination
});

export const changeCurrentIssueAction = (currentIssue) => ({
  type: 'CHANGE_CURRENT_ISSUE',
  currentIssue
});

export const fetchIssueForRepositoryAction = (repositoryOwner, selectedRepository, updateCurrentIssue = false) => {
    return (dispatch, getState) => {
        const { authorization, currentIssue } = getStateData(getState);
        api.fetchIssueForRepository(authorization, repositoryOwner, selectedRepository)
            .then(response => {
                if(response.status !== 200) {
                    throw Error('Bad validation');
                }
                //  get header link
                let parsedLink = parse(response.headers.get('Link'));
                dispatch(setPaginationAction(parsedLink));
                return response.json();
            })
            .then(result => {
                dispatch(loadIssuesForRepoAction(result));
                if (updateCurrentIssue) {
                    result.forEach(issue => {
                        if (issue.number === currentIssue.number) {
                            dispatch(changeCurrentIssueAction(issue));
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }
}
