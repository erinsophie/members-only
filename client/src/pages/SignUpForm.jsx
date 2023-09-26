import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [confirmMsg, setConfirmMsg] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState([]);
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (newUser.password !== newUser.confirmPassword) return;

      const response = await fetch(`${API_BASE_URL}/api/user/sign-up`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        // wait for array of errors from validator
        const errorResponse = await response.json();
        console.log(errorResponse);
        if (errorResponse.errors) {
          const errorMessages = errorResponse.errors.map((err) => err.msg);
          setFeedbackMessage(errorMessages);
        }
        throw new Error('Network response was not ok ' + response.statusText);
      }

      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Sign up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
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

        <ul>
          {feedbackMessage.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>

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
