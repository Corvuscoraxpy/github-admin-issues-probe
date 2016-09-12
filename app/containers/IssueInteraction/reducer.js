import { GET_LIST_COMMENTS_ON_AN_ISSUE } from './actions';

const initialState = {
    listOfComments: [],
}

const issueInteractionReducer = (state = initialState, action) => {
    const { listOfComments } = action;
    switch (action.type) {
        case GET_LIST_COMMENTS_ON_AN_ISSUE:
            return Object.assign({}, state, { listOfComments });

        default:
            return state;
    }
}

export default issueInteractionReducer;
