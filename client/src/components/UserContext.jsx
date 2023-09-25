import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

function useUserContext() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // fetch current user info
  async function getCurrentUser() {
    try {
      let response = await fetch('http://localhost:8080/api/user/info', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      let data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error(error.message);
      setCurrentUser(null);
    }
  }

  // fetch user upon component mount
  useEffect(() => {
    getCurrentUser();
  }, []);

  const providerValues = {
    currentUser,
    setCurrentUser,
    getCurrentUser,
  };

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext, UserProvider };
