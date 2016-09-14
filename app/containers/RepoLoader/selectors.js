const getRepositoryList = () => (state) => state.get('repositoryLoader').repositoryList;
const getRepositoryOwner = () => (state) => state.get('repositoryLoader').repositoryOwner;
const getSelectedRepository = () => (state) => state.get('repositoryLoader').selectedRepository;
const getPermission = () => (state) => state.get('repositoryLoader').permission;
const getRepositoryOwnerData = () => (state) => state.get('repositoryLoader').repositoryOwnerData;

export {
  getRepositoryList,
  getRepositoryOwner,
  getSelectedRepository,
  getPermission,
  getRepositoryOwnerData,
}
