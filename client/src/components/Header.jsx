import { useState } from 'react';

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <header className="flex justify-between p-5 bg-darkBlue text-white items-center relative">
      <h1 className="text-xl">MembersOnly</h1>

      <button
        onClick={() => setDropdownVisible(!isDropdownVisible)}
        className="flex gap-2 items-center"
      >
        My Profile <i className="fa-solid fa-chevron-down"></i>
      </button>

      {isDropdownVisible && (
        <div className="cursor-pointer absolute right-10 top-12 bg-white text-black border border-gray-300">
          <p className="hover:bg-gray-100 p-3 pl-5 pr-5">Membership status</p>
          <p className="hover:bg-gray-100 p-3 pl-5 pr-5">
            Settings <i className="fa-solid fa-gear"></i>
          </p>
          <p className="hover:bg-gray-100 p-3 pl-5 pr-5">
            Logout <i className="fa-solid fa-right-from-bracket"></i>
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
