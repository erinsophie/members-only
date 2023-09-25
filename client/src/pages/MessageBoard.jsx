import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useUserContext } from '../components/UserContext';

function MessageBoard() {
  const { currentUser } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('everyone');
  const [sortOrder, setSortOrder] = useState('oldest');

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
          content: newMessage,
          username: currentUser.username,
          timestamp: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      // re-fetch all messages
      setNewMessage('');
      getMessages();
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) return <p>{`Error: ${error}`}</p>;

  // sorted messages
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });


  return (
    <div className="flex-1 flex flex-col gap-8">
      <h2 className="text-3xl">Messages</h2>

      <select
        onChange={(e) => setSortOrder(e.target.value)}
        defaultValue={'oldest'}
        className="border border-gray-400 w-32"
      >
        <option value="oldest">Oldest</option>
        <option value="newest">Newest</option>
      </select>

      <div className="flex flex-col gap-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          sortedMessages.map((message) => (
            <div
              key={message._id}
              className="bg-gray-100 flex items-center justify-between p-1"
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

        {currentUser && (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              placeholder="message"
              onChange={(e) => setNewMessage(e.target.value)}
              className="border border-gray-400 rounded-lg w-full"
            ></input>
            <button
              type="submit"
              className="w-20 bg-darkBlue text-white p-1 rounded-lg"
            >
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MessageBoard;
