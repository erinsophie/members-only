import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useUserContext } from '../components/UserContext';

function MessageBoard() {
  const { currentUser } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (error) return <p>{`Error: ${error}`}</p>;

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Messages</h2>

      <div className="flex flex-col gap-3 mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          messages.map((message) => (
            <div key={message._id} className="bg-gray-100 flex items-center justify-between">
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
      </div>
    </div>
  );
}

export default MessageBoard;
