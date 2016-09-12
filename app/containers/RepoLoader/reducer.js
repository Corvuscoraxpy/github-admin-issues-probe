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
    switch (action.type) {
        case LOAD_REPOSITORY_LIST:
            const { repositoryList } = action;
            return Object.assign({}, state, { repositoryList });
        case SELECT_REPOSITORY:
            const { selectedRepository } = action;
            return Object.assign({}, state, { selectedRepository });
        case CHANGE_REPOSITORY_OWNER:
            const { repositoryOwner } = action;
            return Object.assign({}, state, { repositoryOwner });
        case SET_PERMISSION:
            const { permission } = action;
            return Object.assign({}, state, { permission });

        default:
            return state;
    }
}

export default repositoryLoaderReducer;
