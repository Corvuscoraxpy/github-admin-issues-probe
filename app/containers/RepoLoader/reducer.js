import {
    LOAD_REPOSITORY_LIST,
    SELECT_REPOSITORY,
    CHANGE_REPOSITORY_OWNER,
} from './actions';

const initialState = {
    repositoryList: [],
    repositoryOwner: '',
    selectedRepository: ''
};

const repositoryLoaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REPOSITORY_LIST:
            return Object.assign({}, state, action);
        case SELECT_REPOSITORY:
            return Object.assign({}, state, action);
        case CHANGE_REPOSITORY_OWNER:
            return Object.assign({}, state, action);

        default:
            return state;
    }
}

export default repositoryLoaderReducer;
