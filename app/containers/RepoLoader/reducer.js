const initialState = {
  repoList: [],
  repoOwner: '',
  selectedRepo: ''
}

const repoLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_REPO_LIST':
      return Object.assign({}, state, action);
    case 'SELECT_REPO':
      return Object.assign({}, state, action);
    case 'SELECT_REPO_OWNER':
      return Object.assign({}, state, action);
    default:
      return state;
  }
}

export default repoLoaderReducer;
