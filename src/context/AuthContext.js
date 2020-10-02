import React from 'react';

export default React.createContext({
  activeUser: null,
  login: () => {},
  invalidate: () => {},
  loginFailed: false,
});
