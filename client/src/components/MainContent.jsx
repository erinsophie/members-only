import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainContent() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col p-16">
        <Outlet />
      </div>
    </div>
  );
}

export default MainContent;
