import {
    LOAD_ISSUES_FOR_REPO,
    LOAD_LABELS_FOR_REPO,
    CHANGE_CURRENT_ISSUE,
} from './actions';

const initialState = {
  issuesList: [],
  labelsList: [],
  currentIssue: {},
};

const repoDataLoaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ISSUES_FOR_REPO:
            return Object.assign({}, state, action);
        case LOAD_LABELS_FOR_REPO:
            return Object.assign({}, state, action);
        case CHANGE_CURRENT_ISSUE:
            return Object.assign({}, state, action);

    default:
        return state;
    }
}

export default repoDataLoaderReducer;
