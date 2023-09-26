import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loading } = useUserContext();

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:8080/api/user/logout', {
        credentials: 'include',
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      console.log(data.message);
      navigate('/');
      setCurrentUser(null);
      console.log('Current user:', currentUser);
    } catch (error) {
      console.error(`Logout failed: ${error.message}`);
    }
  }

  function handleTabChange(tab) {
    setSelected(tab);
    tab === 'messages' ? navigate('/') : navigate(`/${tab}`);
  }

  return (
    <div className="bg-gray-100 h-screen w-48">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="mt-10 text-base">
            <li
              onClick={() => handleTabChange('messages')}
              className={`pl-3 pr-3 p-1 ${
                selected === 'messages'
                  ? 'bg-gray-200 border-l-4 border-orange'
                  : ''
              }`}
            >
              <Link to="/">All messages</Link>
            </li>

            {currentUser && (
              <>
                <li
                  onClick={() => handleTabChange('members')}
                  className={`pl-3 pr-3 p-1 ${
                    selected === 'members'
                      ? 'bg-gray-200 border-l-4 border-orange'
                      : ''
                  }`}
                >
                  <Link to="/members">Members</Link>
                </li>

                <li
                  onClick={() => handleTabChange('logout')}
                  className={`pl-3 pr-3 p-1 ${
                    selected === 'logout'
                      ? 'bg-gray-200 border-l-4 border-orange'
                      : ''
                  }`}
                >
                  <button onClick={handleLogout}>
                    Logout{' '}
                    <i className="fa-solid fa-right-from-bracket text-sm"></i>
                  </button>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;
