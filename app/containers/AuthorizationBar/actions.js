const api = require("../../api/restUtilities.js");

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

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
            .then(result => {
                dispatch(signInAction(username, password, result));
            })
            .catch(err =>{
                console.log(err);
                throw err;
            });
    }
}
