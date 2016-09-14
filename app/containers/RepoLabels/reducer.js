import {
    LOAD_LABELS_FOR_REPO,
    UPDATING_LABELS_LIST,
} from './actions';

const initialState = {
  labelsList: [],
  updateInProcess: false,
};

const repoLabelsReducer = (state = initialState, action) => {
    const { labelsList, updateInProcess } = action;
    switch (action.type) {
        case LOAD_LABELS_FOR_REPO:
            return Object.assign({}, state, { labelsList });
        case UPDATING_LABELS_LIST:
            return Object.assign({}, state, { updateInProcess });

    default:
        return state;
    }
}

export default repoLabelsReducer;
