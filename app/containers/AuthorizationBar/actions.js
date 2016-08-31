
export const signInAction = (username, password, userData) => ({
  type: 'SIGN_IN',
  username,
  password,
  userData,
  signed: true,
});

export const signOutAction = () => ({
  type: 'SIGN_OUT',
  username: '',
  password: '',
  userData: {},
  signed: false,
});
