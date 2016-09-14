const api = require("../../api/restUtilities.js");
const parse = require('parse-link-header');

export const LOAD_ISSUES_FOR_REPO = 'LOAD_ISSUES_FOR_REPO';
export const CHANGE_CURRENT_ISSUE = 'CHANGE_CURRENT_ISSUE';
export const SET_PAGINATION = 'SET_PAGINATION';
export const APPEND_PAGE_TO_ISSUES = 'APPEND_PAGE_TO_ISSUES';

const loadIssuesForRepoAction = (issuesList) => ({
  type: 'LOAD_ISSUES_FOR_REPO',
  issuesList
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

export const fetchSingleIssueAction = (currentIssue) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const repositoryOwner = getState().get('repositoryLoader').repositoryOwner;
        const selectedRepository = getState().get('repositoryLoader').selectedRepository;
        api.fetchSingleIssue(authorization, repositoryOwner, selectedRepository, currentIssue.number)
            .then(issue => {
                dispatch(changeCurrentIssueAction(issue));
            })
            .catch(err => console.log(err));
    }
}

export const fetchIssueForRepositoryAction = (repositoryOwner, selectedRepository) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        return api.fetchIssueForRepository(authorization, repositoryOwner, selectedRepository)
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
            })
            .catch(err => console.log(err));
    }
}
