import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useUserContext } from '../components/UserContext';

function MessageBoard() {
  const { currentUser } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  console.log(messages);

  // fetch messages
  async function getMessages() {
    try {
      let response = await fetch('http://localhost:8080/api/messages', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      let data = await response.json();
      setMessages(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  // add new message
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newMessage,
          username: currentUser.username,
          timestamp: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      // re-fetch all messages
      getMessages();
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) return <p>{`Error: ${error}`}</p>;

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Messages</h2>

      <div className="flex flex-col gap-3 mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className="bg-gray-100 flex items-center justify-between"
            >
              <div>
                <p className="text-darkBlue">{message.content}</p>
                <p className="text-gray-400">
                  {currentUser && currentUser.isMember
                    ? message.username
                    : 'Username hidden'}
                </p>
              </div>
              <p className="text-gray-400">
                {currentUser && currentUser.isMember
                  ? format(parseISO(message.timestamp), 'dd/MM/yyyy HH:mm')
                  : 'Timestamp hidden'}
              </p>
            </div>
          ))
        )}

        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <input
            type="text"
            value={newMessage}
            placeholder="message"
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-400 rounded-lg w-2/5"
          ></input>
          <button type="submit" className='w-20 bg-darkBlue text-white p-1 rounded-lg'>Post</button>
        </form>
      </div>
    </div>
  );
}

export default MessageBoard;
