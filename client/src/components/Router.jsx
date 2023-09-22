import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import MessageBoard from '../pages/MessageBoard';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <MessageBoard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
