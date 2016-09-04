let api = require("../../api/restUtilities.js");

export const LOAD_REPOSITORY_LIST = 'LOAD_REPOSITORY_LIST';
export const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
export const CHANGE_REPOSITORY_OWNER = 'CHANGE_REPOSITORY_OWNER';

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

export const fetchListUserRepositoriesAction = (repositoryOwner) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        return api.fetchListUserRepositories(repositoryOwner, authorization)
            .then( result => {
                dispatch(loadRepositoryListAction(result));
            })
            .catch(err => console.log(err));
    }
}
