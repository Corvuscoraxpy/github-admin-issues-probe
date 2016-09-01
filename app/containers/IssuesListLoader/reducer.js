const initialState = {
  issuesList: [],
  currentIssue: {},
};

const issueLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ISSUES_FOR_REPO':
      return Object.assign({}, state, action);
    case 'CHANGE_CURRENT_ISSUE':
      return Object.assign({}, state, action);
    default:
      return state;
  }
}

export default issueLoaderReducer;
