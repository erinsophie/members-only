import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser, setCurrentUser, loading } = useUserContext();
  const [selected, setSelected] = useState('messages');
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function handleLogout() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
        credentials: 'include',
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      setSelected('messages');
      navigate('/');
      setCurrentUser(null);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelected('messages');
        break;
      case '/logout':
        setSelected('logout');
        break;
      case '/members':
        setSelected('members');
        break;
      default:
        setSelected('messages');
        break;
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-100 p-3 md:p-0 md:w-48">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button
            onClick={() => setDropdownVisible(!isDropdownVisible)}
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={isDropdownVisible}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>

          {isDropdownVisible && (
            <nav>
              <ul className="flex flex-col gap-3">
                <li>
                  {' '}
                  <Link to="/">All messages</Link>
                </li>
                {currentUser && (
                  <>
                    <li>
                      {' '}
                      <Link to="/members">Members</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>
                        Logout{' '}
                        <i className="fa-solid fa-right-from-bracket text-sm"></i>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          )}

          <nav>
            <ul className="hidden md:block mt-10 text-base">
              <li
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
                    className={`pl-3 pr-3 p-1 ${
                      selected === 'members'
                        ? 'bg-gray-200 border-l-4 border-orange'
                        : ''
                    }`}
                  >
                    <Link to="/members">Members</Link>
                  </li>

                  <li
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
          </nav>
        </>
      )}
    </div>
  );
}

export default Sidebar;
