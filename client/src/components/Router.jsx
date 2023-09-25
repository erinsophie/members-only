import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import MessageBoard from '../pages/MessageBoard';
import SignUpForm from '../pages/SignUpForm';
import LoginForm from '../pages/LoginForm';
import MemberForm from '../pages/MemberForm'

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
        {
          path: '/login',
          element: <LoginForm />,
        },
        {
          path: '/member-form',
          element: <MemberForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
