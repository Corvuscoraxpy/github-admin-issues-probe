import { fetchIssueForRepositoryAction } from 'containers/RepoIssues/actions';
const api = require("../../api/restUtilities.js");

export const LOAD_LABELS_FOR_REPO = 'LOAD_LABELS_FOR_REPO';
export const UPDATING_LABELS_LIST = 'UPDATING_LABELS_LIST';

const getStateData = (getState) => {
    return [
        getState().get('authorization').authorization,
        getState().get('repositoryLoader').repositoryOwner,
        getState().get('repositoryLoader').selectedRepository,
        getState().get('repoLabels').updateInProcess,
        getState().get('repoLabels').labelsList,
    ];
}

const loadLabelsForRepoAction = (labelsList) => ({
  type: 'LOAD_LABELS_FOR_REPO',
  labelsList
});

//  for disabling selectFIeld of repository until it updating
const updatingLabelsListAction = (updateInProcess) => ({
    type: 'UPDATING_LABELS_LIST',
    updateInProcess
});

export const fetchListLabelsForRepositoryAction = (repositoryOwner, selectedRepository) => {
    return (dispatch, getState) => {
        const [authorization, , , , previousLabelsList] = getStateData(getState);
        return api.fetchListLabelsForRepository(authorization, repositoryOwner, selectedRepository)
            .then(result => {
                //  if delete or update listItem fetch data until update
                if(!_.isEqual(previousLabelsList, result)) {
                    dispatch(updatingLabelsListAction(false));
                    dispatch(loadLabelsForRepoAction(result));
                    dispatch(fetchIssueForRepositoryAction(repositoryOwner, selectedRepository));
                } else {
                    setTimeout(() => {
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
        const [authorization, repositoryOwner, selectedRepository, updateInProcess] = getStateData(getState);
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
        const [authorization, repositoryOwner, selectedRepository, updateInProcess] = getStateData(getState);
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
        const [authorization, repositoryOwner, selectedRepository, updateInProcess] = getStateData(getState);
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
