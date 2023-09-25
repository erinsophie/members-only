import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [selected, setSelected] = useState('allMessages');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();

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

  return (
    <div className="bg-gray-100 h-screen w-48">
      <ul className="mt-10 text-base">
        <li
          onClick={() => setSelected('allMessages')}
          className={` pl-3 pr-3 p-1 ${
            selected === 'allMessages'
              ? 'bg-gray-200 border-l-4 border-orange'
              : ''
          }`}
        >
          <Link to="/">All messages</Link>
        </li>

        {currentUser && (
          <li
            onClick={() => setSelected('logout')}
            className={`pl-3 pr-3 p-1 ${
              selected === 'logout'
                ? 'bg-gray-200 border-l-4 border-orange'
                : ''
            }`}
          >
            <button onClick={handleLogout}>
              Logout <i className="fa-solid fa-right-from-bracket text-sm"></i>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
