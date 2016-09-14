import {
    LOAD_REPOSITORY_LIST,
    SELECT_REPOSITORY,
    CHANGE_REPOSITORY_OWNER,
    SET_PERMISSION,
    LOAD_REPOSITORY_OWNER_DATA,
} from './actions';

const initialState = {
    repositoryList: [],
    repositoryOwner: '',
    repositoryOwnerData: {},
    selectedRepository: '',
    permission: false,
};

const repositoryLoaderReducer = (state = initialState, action) => {
    const {
        repositoryList,
        selectedRepository,
        repositoryOwner,
        permission,
        repositoryOwnerData,
    } = action;
    switch (action.type) {
        case LOAD_REPOSITORY_LIST:
            return Object.assign({}, state, { repositoryList });
        case SELECT_REPOSITORY:
            return Object.assign({}, state, { selectedRepository });
        case CHANGE_REPOSITORY_OWNER:
            return Object.assign({}, state, { repositoryOwner });
        case SET_PERMISSION:
            return Object.assign({}, state, { permission });
        case LOAD_REPOSITORY_OWNER_DATA:
            return Object.assign({}, state, { repositoryOwnerData });
        default:
            return state;
    }
}

export default repositoryLoaderReducer;
