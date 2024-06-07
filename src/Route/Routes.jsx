import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Root from '../root/Root';
import Details from '../pages/MealsDetails/Details';
import Meals from '../pages/Meals/Meals';
import UpcomingMeals from '../pages/UpcomingMeals/UpcomingMeals';
// import PrivetRoute from './PrivetRoute';

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
        path: '/meals',
        element: <Meals />,
      },
      {
        path: '/upcoming-meals',
        element: <UpcomingMeals />,
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
