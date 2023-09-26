import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';

function LoginForm() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { getCurrentUser } = useUserContext();
  const [feedbackMessage, setFeedbackMessage] = useState([]);
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.errors) {
          const errorMessages = errorResponse.errors.map((err) => err.msg);
          setFeedbackMessage(errorMessages);
          // handle incorrect details
        } else if (response.status == 401) {
          setFeedbackMessage([errorResponse.message]);
        }
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();

      // fetch current user details
      await getCurrentUser();
      console.log(data.message);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Log in</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
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

        <ul>
          {feedbackMessage.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>

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
