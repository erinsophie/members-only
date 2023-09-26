import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser, loading, } = useUserContext();

  return (
    <header className="flex justify-between p-5 bg-darkBlue text-white items-center relative">
      <h1 className="text-2xl">
        <Link to="/">
          MembersOnly <i className="fa-solid fa-lock"></i>
        </Link>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!currentUser && (
            <div className="flex gap-5">
              <Link to="/login">Log in</Link>
              <Link to="/sign-up">Sign up</Link>
            </div>
          )}

          {currentUser && (
            <div className="flex gap-5">
              {!currentUser.isMember && (
                <Link to="/member-form" className="hover:underline">
                  Become a member!
                </Link>
              )}
              <button
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                className="flex gap-2 items-center"
              >
                {currentUser.name} <i className="fa-solid fa-chevron-down"></i>
              </button>

              {isDropdownVisible && (
                <div className="cursor-pointer absolute right-10 top-14 bg-white text-black border border-gray-300">
                  <ul>
                    <li className="hover:bg-gray-100 p-3 pl-5 pr-5">
                      Status:{' '}
                      {currentUser.isMember ? 'Member' : 'User'}
                    </li>
                    <li className="hover:bg-gray-100 p-3 pl-5 pr-5">
                      Admin: {currentUser.isAdmin ? 'Yes' : 'No'}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
