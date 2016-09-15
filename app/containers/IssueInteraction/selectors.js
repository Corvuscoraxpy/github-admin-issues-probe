const getListOfComments = () => (state) => state.get('issueInteraction').listOfComments;
const getIssuesUpdatingList = () => (state) => state.get('issueInteraction').issuesUpdatingList;

export {
    getListOfComments,
}
