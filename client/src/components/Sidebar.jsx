function Sidebar() {
  return (
    <div className="bg-gray-100 h-screen w-48">
      <ul className="mt-10 text-base">
        <li className="cursor-pointer pl-3 pr-3 p-1 hover:bg-gray-200 hover:border-l-4 hover:border-orange">
          All messages
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
