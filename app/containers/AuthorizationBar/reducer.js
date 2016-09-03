const initialState = {
    username: '',
    authorization: '',
    userData: {},
    signStatus: false,
}

const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return Object.assign({}, state, action);
        case 'SIGN_OUT':
            return Object.assign({}, state, action);

        default:
            return state;
    }
}

export default authorizationReducer;
