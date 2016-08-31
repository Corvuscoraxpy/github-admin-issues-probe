const initialState = {
  repoList: [],
}

const repoLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_REPO_LIST':
      return Object.assign({}, state, action);
    default:
      return state;
  }
}

export default repoLoaderReducer;
