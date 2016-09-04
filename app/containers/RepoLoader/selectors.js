const getRepositoryList = () => (state) => state.get('repositoryLoader').repositoryList;
const getRepositoryOwner = () => (state) => state.get('repositoryLoader').repositoryOwner;
const getSelectedRepository = () => (state) => state.get('repositoryLoader').selectedRepository;

export {
  getRepositoryList,
  getRepositoryOwner,
  getSelectedRepository
}
