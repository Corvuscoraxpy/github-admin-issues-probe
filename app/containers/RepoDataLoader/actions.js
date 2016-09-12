const api = require("../../api/restUtilities.js");
const parse = require('parse-link-header');

export const LOAD_ISSUES_FOR_REPO = 'LOAD_ISSUES_FOR_REPO';
export const LOAD_LABELS_FOR_REPO = 'LOAD_LABELS_FOR_REPO';
export const CHANGE_CURRENT_ISSUE = 'CHANGE_CURRENT_ISSUE';
export const UPDATING_LABELS_LIST = 'UPDATING_LABELS_LIST';
export const SET_PAGINATION = 'SET_PAGINATION';
export const APPEND_PAGE_TO_ISSUES = 'APPEND_PAGE_TO_ISSUES';
export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';

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

const loadLabelsForRepoAction = (labelsList) => ({
  type: 'LOAD_LABELS_FOR_REPO',
  labelsList
});

export const changeCurrentIssueAction = (currentIssue) => ({
  type: 'CHANGE_CURRENT_ISSUE',
  currentIssue
});

export const changeActiveTabAction = (activeTab) => ({
    type: 'CHANGE_ACTIVE_TAB',
    activeTab
});

//  for disabling selectFIeld of repository until it updating
const updatingLabelsListAction = (updateInProcess) => ({
    type: 'UPDATING_LABELS_LIST',
    updateInProcess
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

export const fetchListLabelsForRepositoryAction = (repositoryOwner, selectedRepository) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const previousLabelsList = getState().get('repoDataLoader').labelsList;
        return api.fetchListLabelsForRepository(authorization, repositoryOwner, selectedRepository)
            .then(result => {
                //  if delete or update listItem fetch data until update
                if(!_.isEqual(previousLabelsList, result)) {
                    dispatch(updatingLabelsListAction(false));
                    dispatch(loadLabelsForRepoAction(result));
                } else {
                    setTimeout(() => {
                        console.log("i start");
                        dispatch(updatingLabelsListAction(true));
                        dispatch(fetchListLabelsForRepositoryAction(repositoryOwner, selectedRepository));
                    }, 1000);
                }
            })
            .catch(err => console.log(err));
    }
}

export const deleteLablelAction = (labelName) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const repositoryOwner = getState().get('repositoryLoader').repositoryOwner;
        const selectedRepository = getState().get('repositoryLoader').selectedRepository;
        const updateInProcess = getState().get('repoDataLoader').updateInProcess;
        return api.deleteLabel(authorization, repositoryOwner, selectedRepository, labelName)
            .then(result => {
                //  Status: 204 No Content
                if(result.status === 204) {
                    //  if updating not processing
                    if (!updateInProcess) {
                        dispatch(fetchListLabelsForRepositoryAction(repositoryOwner, selectedRepository));
                    }
                }
            })
            .catch(err => console.log(err));
    }
}

export const updateLabelAction = (labelUrl, newName, newColor) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const repositoryOwner = getState().get('repositoryLoader').repositoryOwner;
        const selectedRepository = getState().get('repositoryLoader').selectedRepository;
        const updateInProcess = getState().get('repoDataLoader').updateInProcess;
        return api.updateLabel(authorization, labelUrl, newName, newColor)
            .then(result => {
                //  Status: 200 OK
                if(result.status === 200) {
                    //  if updating not processing
                    if (!updateInProcess) {
                        dispatch(fetchListLabelsForRepositoryAction(repositoryOwner, selectedRepository));

                    }
                }
            })
            .catch(err => console.log(err));
    }
}

export const createLabelAction = (name, color) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const repositoryOwner = getState().get('repositoryLoader').repositoryOwner;
        const selectedRepository = getState().get('repositoryLoader').selectedRepository;
        const updateInProcess = getState().get('repoDataLoader').updateInProcess;
        return api.createLabel(authorization, repositoryOwner, selectedRepository, name, color)
            .then(result => {
                //  Status: 201 Created
                if(result.status === 201) {
                    //  if updating not processing
                    if (!updateInProcess) {
                        dispatch(fetchListLabelsForRepositoryAction(repositoryOwner, selectedRepository));
                    }
                }
            })
            .catch(err => console.log(err));
    }
}
