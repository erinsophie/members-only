import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
