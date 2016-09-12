const getIssueList = () => (state) => state.get('repoDataLoader').issuesList;
const getCurrentIssue = () => (state) => state.get('repoDataLoader').currentIssue;
const getLabelsList = () => (state) => state.get('repoDataLoader').labelsList;
const getStatusOfUpdating = () => (state) => state.get('repoDataLoader').updateInProcess;
const getPagination = () => (state) => state.get('repoDataLoader').pagination;
const getActiveTab = () => (state) => state.get('repoDataLoader').activeTab;

export {
  getIssueList,
  getCurrentIssue,
  getLabelsList,
  getStatusOfUpdating,
  getPagination,
  getActiveTab,
}
