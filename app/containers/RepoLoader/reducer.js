import {
    LOAD_REPOSITORY_LIST,
    SELECT_REPOSITORY,
    CHANGE_REPOSITORY_OWNER,
    SET_PERMISSION,
} from './actions';

const initialState = {
    repositoryList: [],
    repositoryOwner: '',
    selectedRepository: '',
    permission: false,
};

const repositoryLoaderReducer = (state = initialState, action) => {
    const { repositoryList, selectedRepository, repositoryOwner, permission } = action;
    switch (action.type) {
        case LOAD_REPOSITORY_LIST:
            return Object.assign({}, state, { repositoryList });
        case SELECT_REPOSITORY:
            return Object.assign({}, state, { selectedRepository });
        case CHANGE_REPOSITORY_OWNER:
            return Object.assign({}, state, { repositoryOwner });
        case SET_PERMISSION:
            return Object.assign({}, state, { permission });

        default:
            return state;
    }
}

export default repositoryLoaderReducer;
