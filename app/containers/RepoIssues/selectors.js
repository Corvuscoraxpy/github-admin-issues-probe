const getIssueList = () => (state) => state.get('repoIssues').issuesList;
const getCurrentIssue = () => (state) => state.get('repoIssues').currentIssue;
const getPagination = () => (state) => state.get('repoIssues').pagination;
const getActiveTab = () => (state) => state.get('repoIssues').activeTab;

export {
  getIssueList,
  getCurrentIssue,
  getPagination,
  getActiveTab,
}
