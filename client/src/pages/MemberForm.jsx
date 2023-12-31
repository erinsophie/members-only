import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';

function MemberForm() {
  const navigate = useNavigate();
  const { getCurrentUser, currentUser } = useUserContext();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [input, setInput] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    const userID = currentUser._id;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/${userID}/membership`,
        {
          credentials: 'include',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput: input }),
        },
      );

      if (!response.ok) {
        if (response.status === 403) {
          const error = await response.json();
          setFeedbackMessage(error.message);
        }
        throw new Error('Network response was not ok ' + response.statusText);
      }

      // if code is correct, refetch current user data
      const data = await response.json();
      console.log(data.message);
      await getCurrentUser();
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Become a member</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
        <label htmlFor="secretCode">Enter the top secret code:</label>
        <input
          id="secretCode"
          name="secretCode"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="border border-gray-400"
        />

        <p>{feedbackMessage}</p>

        <button
          type="submit"
          className="w-32 bg-darkBlue text-white p-2 rounded-lg"
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default MemberForm;
