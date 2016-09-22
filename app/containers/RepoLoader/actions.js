let api = require("../../api/restUtilities.js");

export const LOAD_REPOSITORY_LIST = 'LOAD_REPOSITORY_LIST';
export const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
export const CHANGE_REPOSITORY_OWNER = 'CHANGE_REPOSITORY_OWNER';
export const SET_PERMISSION = 'SET_PERMISSION';
export const LOAD_REPOSITORY_OWNER_DATA = 'LOAD_REPOSITORY_OWNER_DATA';

const getStateData = (getState) => ({
    authorization: getState().get('authorization').authorization,
    username: getState().get('authorization').username,
});

export const loadRepositoryListAction = (repositoryList) => ({
    type: 'LOAD_REPOSITORY_LIST',
    repositoryList,
});

export const selectRepositoryAction = (selectedRepository) => ({
    type: 'SELECT_REPOSITORY',
    selectedRepository
});

export const changeRepositoryOwnerAction = (repositoryOwner) => ({
    type: 'CHANGE_REPOSITORY_OWNER',
    repositoryOwner
});

export const loadRepositoryOwnerDataAction = (repositoryOwnerData) => ({
    type: 'LOAD_REPOSITORY_OWNER_DATA',
    repositoryOwnerData
});

const setPermissionAction = (username, repositoryOwner) => ({
    type: 'SET_PERMISSION',
    permission: username === repositoryOwner
});

export const fetchListUserRepositoriesAction = (repositoryOwner) => {
    return (dispatch, getState) => {
        const { authorization, username } = getStateData(getState);
        api.fetchListUserRepositories(repositoryOwner, authorization)
            .then(result => {
                dispatch(loadRepositoryListAction(result));
                dispatch(setPermissionAction(repositoryOwner, username));
            })
            .catch(err => console.log(err));
    }
}

export const fetchRepositoryOwnerAction = (repositoryOwner) => {
    return (dispatch, getState) => {
        const { authorization } = getStateData(getState);
        api.fetchSingleUser(repositoryOwner, authorization)
            .then(result => {
                dispatch(changeRepositoryOwnerAction(repositoryOwner));
                dispatch(loadRepositoryOwnerDataAction(result));
            })
            .catch(err => console.log(err));
    }
}
