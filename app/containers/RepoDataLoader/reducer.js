import {
    LOAD_ISSUES_FOR_REPO,
    CHANGE_CURRENT_ISSUE,
    SET_PAGINATION,
    APPEND_PAGE_TO_ISSUES,
    UPDATE_CURRENT_ISSUE_IN_LIST,
} from './actions';

const initialState = {
  issuesList: [],
  currentIssue: {},
  pagination: {},
};

const repoDataLoaderReducer = (state = initialState, action) => {
    const {
        issuesList,
        currentIssue,
        pagination,
        pageList,
    } = action;
    switch (action.type) {
        case LOAD_ISSUES_FOR_REPO:
            return Object.assign({}, state, { issuesList });
        case CHANGE_CURRENT_ISSUE:
            return Object.assign({}, state, { currentIssue });
        case SET_PAGINATION:
            return Object.assign({}, state, { pagination });
        case APPEND_PAGE_TO_ISSUES:
            return Object.assign(
                {},
                {...state},
                {issuesList: [...state.issuesList, ...pageList]}
            );
        case UPDATE_CURRENT_ISSUE_IN_LIST:
            return Object.assign(
                {},
                {...state},
                {issuesList: [
                    ...state.issuesList.slice(0, state.issuesList.length -currentIssue.number),
                    currentIssue,
                    ...state.issuesList.slice(state.issuesList.length -currentIssue.number + 1, state.issuesList.length)
                ]}
            );

    default:
        return state;
    }
}

export default repoDataLoaderReducer;
