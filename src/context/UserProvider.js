import React, { useState, createContext } from 'react';

export const UserContext = createContext({
  userState: null,
  setUserState: (user) => {},
});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    userState: user,
    setUserState: (userInfo) => {
      setUser(userInfo);
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
