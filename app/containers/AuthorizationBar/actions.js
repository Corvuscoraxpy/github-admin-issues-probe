const api = require("../../api/restUtilities.js");

export const signInAction = (username, password, userData) => ({
    type: 'SIGN_IN',
    username,
    userData,
    authorization: "Basic " + btoa(`${username}:${password}`),
    signStatus: true,
});

export const signOutAction = () => ({
    type: 'SIGN_OUT',
    username: '',
    authorization: '',
    userData: {},
    signStatus: false,
});

export const onSignInAction = (username, password) => {
    return dispatch => {
        return api.fetchAuthorization(username, password)
            .then( res => {
                dispatch(signInAction(username, password, res));
            })
            .catch(err => console.log(err));
    }
}
