import { FaFirstOrder, FaHome, FaSitemap, FaUsersCog } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import {
  MdAddChart,
  MdDashboardCustomize,
  MdOutlineMenuBook,
} from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toaster } from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const Dashboard = () => {
  const { logOutAcc } = useAuth();
  const logout = () => {
    logOutAcc();
    Swal.fire({
      title: 'Logged Out',
      text: 'Your account has been successfully logged out.',
      icon: 'success',
    });
  };
  return (
    <div className="flex h-screen overflow-y-auto min-w-[1000px] overflow-x-auto">
      <Toaster />
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center p-4 h-screen overflow-y-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">Dashboard Logo</h2>
        </div>
        <nav className="w-full">
          <ul className="list-none p-0 dashboardNav">
            <li className="w-full mb-2">
              <NavLink
                end
                to={'/dashboard'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <MdDashboardCustomize />
                </span>
                My Profile
              </NavLink>
            </li>
            <li className="w-full mb-2">
              <NavLink
                to={'/dashboard/Requested-Mealss'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <FaFirstOrder />
                </span>
                Requested Meals
              </NavLink>
            </li>
            <li className="w-full mb-2">
              <NavLink
                to={'/dashboard/My-Reviews'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <MdAddChart />
                </span>
                My Reviews
              </NavLink>
            </li>
            <li className="w-full mb-2">
              <NavLink
                to={'/dashboard/Payment-History'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <FaSitemap />
                </span>
                Payment History
              </NavLink>
            </li>
            <li className="w-full mb-2">
              <NavLink
                to={'/dashboard/all-employees'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <FaUsersCog />
                </span>
                Admin Profile
              </NavLink>
            </li>
            <hr className="my-3" />
            <li className="w-full mb-2">
              <Link
                to={'/'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <FaHome />
                </span>
                Home
              </Link>
            </li>
            <li className="w-full mb-2">
              <Link
                to={'/today-menu'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <MdOutlineMenuBook />
                </span>
                Today Menus
              </Link>
            </li>
            <li className="w-full mb-2">
              <button
                onClick={logout}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <span>
                  <LuLogOut />
                </span>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main
        id="dashboarMain"
        className="flex-grow h-screen overflow-y-auto bg-gray-100"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
