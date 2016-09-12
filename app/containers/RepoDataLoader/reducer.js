import {
    LOAD_ISSUES_FOR_REPO,
    LOAD_LABELS_FOR_REPO,
    CHANGE_CURRENT_ISSUE,
    UPDATING_LABELS_LIST,
    SET_PAGINATION,
    APPEND_PAGE_TO_ISSUES,
    CHANGE_ACTIVE_TAB,
} from './actions';

const initialState = {
  issuesList: [],
  labelsList: [],
  currentIssue: {},
  updateInProcess: false,
  pagination: {},
  activeTab: 'List Of Issues',
};

const repoDataLoaderReducer = (state = initialState, action) => {
    const {
        issuesList,
        labelsList,
        currentIssue,
        updateInProcess,
        pagination,
        pageList,
        activeTab
    } = action;
    switch (action.type) {
        case LOAD_ISSUES_FOR_REPO:
            return Object.assign({}, state, { issuesList });
        case LOAD_LABELS_FOR_REPO:
            return Object.assign({}, state, { labelsList });
        case CHANGE_CURRENT_ISSUE:
            return Object.assign({}, state, { currentIssue });
        case UPDATING_LABELS_LIST:
            return Object.assign({}, state, { updateInProcess });
        case SET_PAGINATION:
            return Object.assign({}, state, { pagination });
        case APPEND_PAGE_TO_ISSUES:
            return Object.assign(
                {},
                {...state},
                {issuesList: [...state.issuesList, ...pageList]}
            );
        case CHANGE_ACTIVE_TAB:
            return Object.assign({}, state, { activeTab });

    default:
        return state;
    }
}

export default repoDataLoaderReducer;
