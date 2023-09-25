import { useState } from 'react';

function MemberForm() {
  const [input, setInput] = useState('');

  console.log(input)

  return (
    <div className="flex-1">
      <h2 className="text-3xl">Become a member</h2>

      <form className="flex flex-col gap-4 mt-10">
        <label htmlFor="message">Enter the top secret code:</label>
        <input
          id="message"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="border border-gray-400"
        />

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
