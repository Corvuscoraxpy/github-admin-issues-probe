import { fetchIssueForRepositoryAction } from 'containers/RepoIssues/actions';
const api = require("../../api/restUtilities.js");

export const LOAD_LABELS_FOR_REPO = 'LOAD_LABELS_FOR_REPO';
export const UPDATING_LABELS_LIST = 'UPDATING_LABELS_LIST';

const getStateData = (getState) => ({
    authorization: getState().get('authorization').authorization,
    repositoryOwner: getState().get('repositoryLoader').repositoryOwner,
    selectedRepository: getState().get('repositoryLoader').selectedRepository,
    updateInProcess: getState().get('repoLabels').updateInProcess,
    labelsList: getState().get('repoLabels').labelsList,
});

const loadLabelsForRepoAction = (labelsList) => ({
  type: 'LOAD_LABELS_FOR_REPO',
  labelsList
});

//  for disabling selectFIeld of repository until it updating
const updatingLabelsListAction = (updateInProcess) => ({
    type: 'UPDATING_LABELS_LIST',
    updateInProcess
});

export const fetchListLabelsForRepositoryAction = (repositoryOwner, selectedRepository, createLabel = false) => {
    return (dispatch, getState) => {
        const { authorization, labelsList } = getStateData(getState);
        api.fetchListLabelsForRepository(authorization, repositoryOwner, selectedRepository)
            .then(result => {
                //  if delete or update listItem fetch data until update
                //  compare previous labelsList with new result
                if(!_.isEqual(labelsList.sort(), result.sort())) {
                    dispatch(updatingLabelsListAction(false));
                    dispatch(loadLabelsForRepoAction(result));
                    if (!createLabel) {
                        dispatch(fetchIssueForRepositoryAction(repositoryOwner, selectedRepository, true));
                    }
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
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            updateInProcess
        } = getStateData(getState);

        api.deleteLabel(authorization, repositoryOwner, selectedRepository, labelName)
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
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            updateInProcess
        } = getStateData(getState);

        api.updateLabel(authorization, labelUrl, newName, newColor)
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
        const {
            authorization,
            repositoryOwner,
            selectedRepository,
            updateInProcess
        } = getStateData(getState);

        api.createLabel(authorization, repositoryOwner, selectedRepository, name, color)
            .then(result => {
                //  Status: 201 Created
                if(result.status === 201) {
                    //  if updating not processing
                    if (!updateInProcess) {
                        dispatch(fetchListLabelsForRepositoryAction(repositoryOwner, selectedRepository, true));
                    }
                }
            })
            .catch(err => console.log(err));
    }
}
