const getUserName = () => (state) => state.get('authorization').username;
const getUserData = () => (state) => state.get('authorization').userData;
const getUserSignStatus = () => (state) => state.get('authorization').signStatus;
const getAuthorization = () => (state) => state.get('authorization').authorization;
export {
    getUserName,
    getUserData,
    getUserSignStatus,
    getAuthorization,
}
