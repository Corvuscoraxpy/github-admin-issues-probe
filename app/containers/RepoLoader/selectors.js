const getRepoList = () => (state) => state.get('repoLoader').repoList;
const getRepoOwner = () => (state) => state.get('repoLoader').repoOwner;
const getSelectedRepo = () => (state) => state.get('repoLoader').selectedRepo;

export {
  getRepoList,
  getRepoOwner,
  getSelectedRepo
}
