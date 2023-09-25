import { useState } from 'react';

function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [id]: value,
    }));
  }

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Log in</h2>

      <form className="flex flex-col gap-4 mt-10">
        <label htmlFor="username">Username*</label>
        <input
          id="username"
          type="text"
          value={loginData.username}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />

        <label htmlFor="password">Password*</label>
        <input
          id="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          required
          className="border border-gray-400"
        />

        <button
          type="submit"
          className="w-32 bg-darkBlue text-white p-2 rounded-lg"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
