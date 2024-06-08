import {
  FaArrowLeft,
  FaFirstOrder,
  FaHome,
  FaSitemap,
  FaUsersCog,
} from 'react-icons/fa';
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
import useAdmin from '../../Hooks/useAdmin';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';

const Dashboard = () => {
  const admin = useAdmin();
  const [isMnu, setMenu] = useState(false);
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
    <div className="lg:flex lg:flex-row h-screen overflow-hidden relative">
      <Toaster />
      <aside
        className={`h-screen lg:h-auto absolute left-0 top-0 lg:static w-full sm:w-72 lg:w-64 bg-gray-800 text-white lg:flex flex-col items-center p-4 md:h-full overflow-y-auto ${
          isMnu ? 'translate-x-0' : '-translate-x-[700px] lg:translate-x-0'
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard Logo</h2>
          {isMnu && (
            <button
              onClick={() => setMenu(false)}
              className="text-2xl lg:hidden"
            >
              <FaArrowLeft />
            </button>
          )}
        </div>
        <nav className="w-full">
          <ul className="list-none p-0">
            {admin ? (
              <>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard'}
                    end
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    Admin Profile
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/Manage-Users'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    Manage Users
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/Add-Meal'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    Add Meal
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/All-Meals'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    All Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/All-Reviews'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    All Reviews
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/Serve-Meals'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    Serve Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/Upcoming-Meals'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    Upcoming Meals
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="w-full mb-2">
                  <NavLink
                    end
                    to={'/dashboard'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdDashboardCustomize />
                    My Profile
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/Requested-Mealss'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaFirstOrder />
                    Requested Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/My-Reviews'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdAddChart />
                    My Reviews
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink
                    to={'/dashboard/Payment-History'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaSitemap />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            <hr className="my-3" />
            <li className="w-full mb-2">
              <Link
                to={'/'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <FaHome />
                Home
              </Link>
            </li>
            <li className="w-full mb-2">
              <Link
                to={'/meals'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <MdOutlineMenuBook />
                Meals
              </Link>
            </li>
            <li className="w-full mb-2">
              <Link
                to={'/upcoming-meals'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <MdOutlineMenuBook />
                Upcoming Meals
              </Link>
            </li>
            <li className="w-full mb-2">
              <button
                onClick={logout}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <LuLogOut />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main
        id="dashboarMain"
        className="flex-grow h-full overflow-y-auto bg-gray-100 p-4"
      >
        <button onClick={() => setMenu(true)} className="text-3xl lg:hidden">
          <IoMenu />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
