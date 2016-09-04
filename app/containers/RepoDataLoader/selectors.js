const getIssueList = () => (state) => state.get('repoDataLoader').issuesList;
const getCurrentIssue = () => (state) => state.get('repoDataLoader').currentIssue;
const getLabelsList = () => (state) => state.get('repoDataLoader').labelsList;

export {
  getIssueList,
  getCurrentIssue,
  getLabelsList,
}
