import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainContent() {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="p-5 md:flex-1 md:p-16">
        <Outlet />
      </div>
    </div>
  );
}

export default MainContent;
