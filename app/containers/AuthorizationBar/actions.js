
export const signInAction = (username, password, userData) => ({
  type: 'SIGN_IN',
  username,
  userData,
  authorization: "Basic " + btoa(`${username}:${password}`),
  signed: true,
});

export const signOutAction = () => ({
  type: 'SIGN_OUT',
  username: '',
  authorization: '',
  userData: {},
  signed: false,
});
