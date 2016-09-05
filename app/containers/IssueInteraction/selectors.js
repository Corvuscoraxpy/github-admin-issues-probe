const getListOfComments = () => (state) => state.get('IssueInteraction').listOfComments;

export {
    getListOfComments,
}
