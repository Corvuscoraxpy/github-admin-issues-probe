const getIssueList = () => (state) => state.get('issueLoader').issuesList;
const getCurrentIssue = () => (state) => state.get('issueLoader').currentIssue;

export {
  getIssueList,
  getCurrentIssue,
}
