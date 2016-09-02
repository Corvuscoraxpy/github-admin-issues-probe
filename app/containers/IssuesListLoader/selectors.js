const getIssueList = () => (state) => state.get('issueLoader').issuesList;
const getCurrentIssue = () => (state) => state.get('issueLoader').currentIssue;
const getLabelsList = () => (state) => state.get('issueLoader').labelsList;

export {
  getIssueList,
  getCurrentIssue,
  getLabelsList,
}
