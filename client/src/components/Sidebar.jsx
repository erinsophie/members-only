import { useState } from 'react';

function Sidebar() {
  const [selected, setSelected] = useState(true);

  return (
    <div className="bg-gray-100 h-screen w-48">
      <ul className="mt-10 text-base">
        <li className={selected && "cursor-pointer pl-3 pr-3 p-1 bg-gray-200 border-l-4 border-orange"}>
          All messages
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
