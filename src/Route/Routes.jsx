import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Root from '../root/Root';
import Details from '../pages/MealsDetails/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/meal/:id',
        element: <Details />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
export default router;
