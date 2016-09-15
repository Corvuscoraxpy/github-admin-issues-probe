import {
    GET_LIST_COMMENTS_ON_AN_ISSUE,
    ADD_TO_ISSUES_UPDATING_LIST,
    REMOVE_FROM_ISSUES_UPDATING_LIST,
} from './actions';

const initialState = {
    listOfComments: [],
    issuesUpdatingList: [],
}

const issueInteractionReducer = (state = initialState, action) => {
    const { listOfComments, number, index } = action;
    switch (action.type) {
        case GET_LIST_COMMENTS_ON_AN_ISSUE:
            return Object.assign({}, state, { listOfComments });
        case ADD_TO_ISSUES_UPDATING_LIST:
            return Object.assign({}, state, {issuesUpdatingList: [...state.issuesUpdatingList, number]});
        case REMOVE_FROM_ISSUES_UPDATING_LIST:
            return Object.assign(
                {},
                state,
                {issuesUpdatingList: [
                    ...state.issuesUpdatingList.slice(0, index),
                    ...state.issuesUpdatingList.slice(index + 1)
                ]}
            );

        default:
            return state;
    }
}

export default issueInteractionReducer;
