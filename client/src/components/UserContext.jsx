import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

function useUserContext() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // fetch current user info
  async function getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/info`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error(error.message);
      setCurrentUser(null);
    } finally {
      setLoading(false);
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
    loading,
  };

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext, UserProvider };
