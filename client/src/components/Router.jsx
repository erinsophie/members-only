import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import MessageBoard from '../pages/MessageBoard';
import SignUpForm from '../pages/SignUpForm';

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
        {
          path: '/sign-up',
          element: <SignUpForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
