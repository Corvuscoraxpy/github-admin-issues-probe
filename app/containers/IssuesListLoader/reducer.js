const initialState = {
  issuesList: [],
};

const issueLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ISSUES_FOR_REPO':
      return Object.assign({}, state, action);
    default:
      return state;
  }
}

export default issueLoaderReducer;
