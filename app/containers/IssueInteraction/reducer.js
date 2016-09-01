const initialState = {
  listOfComments: [],
}

const issueInteractionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_COMMENTS_ON_AN_ISSUE':
      return Object.assign({}, state, action);
    default:
      return state;
  }
}

export default issueInteractionReducer;
