const getLabelsList = () => (state) => state.get('repoLabels').labelsList;
const getStatusOfUpdating = () => (state) => state.get('repoLabels').updateInProcess;

export {
    getLabelsList,
    getStatusOfUpdating,
}
