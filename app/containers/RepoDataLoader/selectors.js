const getIssueList = () => (state) => state.get('repoDataLoader').issuesList;
const getCurrentIssue = () => (state) => state.get('repoDataLoader').currentIssue;
const getPagination = () => (state) => state.get('repoDataLoader').pagination;
const getActiveTab = () => (state) => state.get('repoDataLoader').activeTab;

export {
  getIssueList,
  getCurrentIssue,
  getPagination,
  getActiveTab,
}
