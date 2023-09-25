import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <header className="flex justify-between p-5 bg-darkBlue text-white items-center relative">
      <h1 className="text-2xl">
        <Link to="/">MembersOnly <i className="fa-solid fa-lock"></i></Link>
      </h1>
      <div className="flex gap-5">
        <Link to="/login" className="hover:underline">
          Log in
        </Link>
        <Link to="/sign-up" className="hover:underline">
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Header;
