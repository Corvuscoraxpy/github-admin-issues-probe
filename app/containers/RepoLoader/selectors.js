const getRepoList = () => (state) => state.get('repoLoader').repoList;
const getSelectedRepo = () => (state) => state.get('repoLoader').selectedRepo;

export {
  getRepoList,
  getSelectedRepo
}
