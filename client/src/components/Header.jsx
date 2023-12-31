import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser, loading } = useUserContext();

  return (
    <header className="flex justify-between p-3 bg-darkBlue text-white items-center relative md:p-5">
      <h1 className="text-base md:text-2xl">
        MembersOnly <i className="fa-solid fa-lock"></i>
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
                aria-label="View profile details"
                aria-expanded={isDropdownVisible}
              >
                {currentUser.name} <i className="fa-solid fa-chevron-down"></i>
              </button>

              {isDropdownVisible && (
                <div className="cursor-pointer absolute right-10 top-14 bg-white text-black border border-gray-300">
                  <ul>
                    <li className="hover:bg-gray-100 p-3 pl-5 pr-5">
                      Status: {currentUser.isMember ? 'Member' : 'User'}
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
