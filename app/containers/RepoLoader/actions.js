let api = require("../../api/restUtilities.js");

export const LOAD_REPOSITORY_LIST = 'LOAD_REPOSITORY_LIST';
export const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
export const CHANGE_REPOSITORY_OWNER = 'CHANGE_REPOSITORY_OWNER';
export const SET_PERMISSION = 'SET_PERMISSION';

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

const setPermissionAction = (username, repositoryOwner) => ({
    type: 'SET_PERMISSION',
    permission: username === repositoryOwner
})

export const fetchListUserRepositoriesAction = (repositoryOwner) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        const username = getState().get('authorization').username;
        return api.fetchListUserRepositories(repositoryOwner, authorization)
            .then( result => {
                dispatch(loadRepositoryListAction(result));
                dispatch(setPermissionAction(repositoryOwner, username));
            })
            .catch(err => console.log(err));
    }
}
