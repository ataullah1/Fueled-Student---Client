import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Root from '../root/Root';
import Details from '../pages/MealsDetails/Details';
import Meals from '../pages/Meals/Meals';
import UpcomingMeals from '../pages/UpcomingMeals/UpcomingMeals';
import Error from '../pages/Error/Error';
import PrivetRoute from './PrivetRoute';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardHome from '../pages/Dashboard/DashboardComponent/DashboardHome';
import RequestedMeals from '../pages/Dashboard/DashboardComponent/RequestedMeals';
import MyReviews from '../pages/Dashboard/DashboardComponent/MyReviews';
import PaymentHistory from '../pages/Dashboard/DashboardComponent/PaymentHistory';
// import PrivetRoute from './PrivetRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
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
    path: '/dashboard',
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardHome />,
      },
      {
        path: '/dashboard/Requested-Meals',
        element: <RequestedMeals />,
      },
      {
        path: '/dashboard/My-Reviews',
        element: <MyReviews />,
      },
      {
        path: '/dashboard/Payment-History',
        element: <PaymentHistory />,
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
