import { useState, useEffect } from 'react';
import { useUserContext } from '../components/UserContext';

function Members() {
  const { currentUser } = useUserContext();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function getMembers() {
    try {
      let response = await fetch(`${API_BASE_URL}/api/user/members`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      let data = await response.json();
      setMembers(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);

  if (error) return <p>{`Error: ${error}`}</p>;

  async function handleAdminToggle(member, isAdmin) {
    if (currentUser._id === member._id) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/${isAdmin ? 'become-admin' : 'remove-admin'}`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: member._id }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      // Refetch all members
      await getMembers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className="text-3xl">Members</h2>
      <div>
        <p>Admins are members who can delete messages.</p>
        <p>
          To become an admin you must ask an existing admin for these
          privileges.
        </p>
      </div>
      {loading ? (
        <p>Loading..</p>
      ) : (
        members.map((member) => (
          <div key={member._id} className="flex justify-between">
            <div className="p-1 bg-gray-100 w-[95%] flex justify-between">
              <p>{member.username}</p>
              <p>{member.isAdmin && 'Admin'}</p>
            </div>

            {currentUser && currentUser.isAdmin && (
              <input
                type="checkbox"
                checked={member.isAdmin}
                onChange={(e) => handleAdminToggle(member, e.target.checked)}
                className="w-4"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Members;
