import { useState } from 'react';

function SignUpForm() {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Sign up</h2>

      <form className="flex flex-col gap-4 mt-10">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={newUser.name}
          className="border border-gray-400"
        />

        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={newUser.username}
          className="border border-gray-400"
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={newUser.email}
          className="border border-gray-400"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={newUser.password}
          className="border border-gray-400"
        />

        <label htmlFor="password">Confirm password:</label>
        <input
          id="password"
          type="password"
          value={newUser.confirmPassword}
          className="border border-gray-400"
        />

        <button
          type="submit"
          className="w-32 bg-darkBlue text-white p-2 rounded-lg"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
