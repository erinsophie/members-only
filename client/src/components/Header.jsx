import { useState } from 'react';

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <header className="flex justify-between p-5 bg-darkBlue text-white items-center relative">
      <h1 className="text-2xl">MembersOnly</h1>

      <button
        onClick={() => setDropdownVisible(!isDropdownVisible)}
        className="flex gap-2 items-center"
      >
        My Profile <i className="fa-solid fa-chevron-down"></i>
      </button>

      {isDropdownVisible && (
        <div className="cursor-pointer absolute right-10 top-14 bg-white text-black border border-gray-300">
          <ul>
            <li className="hover:bg-gray-100 p-3 pl-5 pr-5">
              Membership status
            </li>
            <li className="hover:bg-gray-100 p-3 pl-5 pr-5">
              Settings <i className="text-sm fa-solid fa-gear"></i>
            </li>
            <li className="hover:bg-gray-100 p-3 pl-5 pr-5">
              Logout <i className="fa-solid fa-right-from-bracket"></i>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
