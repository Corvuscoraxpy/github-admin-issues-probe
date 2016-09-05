const getIssueList = () => (state) => state.get('repoDataLoader').issuesList;
const getCurrentIssue = () => (state) => state.get('repoDataLoader').currentIssue;
const getLabelsList = () => (state) => state.get('repoDataLoader').labelsList;
const getStatusOfUpdating = () => (state) => state.get('repoDataLoader').updateInProcess;

export {
  getIssueList,
  getCurrentIssue,
  getLabelsList,
  getStatusOfUpdating,
}
