import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [selected, setSelected] = useState('allMessages');

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
        <li
          onClick={() => setSelected('logout')}
          className={`pl-3 pr-3 p-1 ${
            selected === 'logout' ? 'bg-gray-200 border-l-4 border-orange' : ''
          }`}
        >
          <Link>
            Logout <i className="fa-solid fa-right-from-bracket text-sm"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
