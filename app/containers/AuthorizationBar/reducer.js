import { SIGN_IN, SIGN_OUT } from './actions';

const initialState = {
    username: '',
    authorization: '',
    userData: {},
    signStatus: false,
}

const authorizationReducer = (state = initialState, action) => {
    const { username, authorization, userData, signStatus } = action;
    switch (action.type) {
        case SIGN_IN:
        case SIGN_OUT:
            return Object.assign(
                {},
                state,
                {username, authorization, userData, signStatus}
            );

        default:
            return state;
    }
}

export default authorizationReducer;
