import { useState } from 'react';

function SignUpForm() {
  const [confirmMsg, setConfirmMsg] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setNewUser((prevUserData) => {
      const updatedUserData = { ...prevUserData, [id]: value };

      if (id === 'confirmPassword' || id === 'password') {
        updatedUserData.password !== updatedUserData.confirmPassword
          ? setConfirmMsg('Passwords do not match')
          : setConfirmMsg('Passwords match');
      }

      return updatedUserData;
    });
  }

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Sign up</h2>

      <form className="flex flex-col gap-4 mt-10">
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="text"
          value={newUser.name}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />

        <label htmlFor="username">Username*</label>
        <input
          id="username"
          type="text"
          value={newUser.username}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />

        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="email"
          value={newUser.email}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />

        <label htmlFor="password">Password*</label>
        <input
          id="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />

        <label htmlFor="confirmPassword">Confirm password*</label>
        <input
          id="confirmPassword"
          type="password"
          value={newUser.confirmPassword}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />
        <p
          className={
            newUser.password === newUser.confirmPassword
              ? 'text-green-600'
              : 'text-red-600'
          }
        >
          {confirmMsg}
        </p>

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
