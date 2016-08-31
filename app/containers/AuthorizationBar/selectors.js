const getUserName = () => (state) => state.get('authorization').username;
const getUserData = () => (state) => state.get('authorization').userData;
const getUserSignStatus = () => (state) => state.get('authorization').signed;
const getPassword = () => (state) => state.get('authorization').password;
export {
  getUserName,
  getUserData,
  getUserSignStatus,
  getPassword,
}
