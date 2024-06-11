import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../Hooks/useAxiosSec';
import { RiHeart2Line } from 'react-icons/ri';
import { TbShare } from 'react-icons/tb';
import { BiMessageRoundedDots } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import usePayment from '../../Hooks/usePayment';
import UpcomingMealSke from '../../components/Skeleton/UpcomingMealSke';
import FilterSearching from '../../utility/FilterSearching';

const UpcomingMeals = () => {
  const { userDta } = useAuth();
  const naviget = useNavigate();
  const axiosSec = useAxiosSec();
  const [filter, handleFilter] = useState('');
  const [search, setSearch] = useState('');

  const isPay = usePayment();
  const { data = [], isLoading } = useQuery({
    queryKey: ['upcoming-meals', search, filter],
    queryFn: async () => {
      const { data } = await axiosSec.get(
        `/upcoming-meals?filter=${filter}&search=${search}`
      );
      return data;
    },
  });

  // console.log(isPay, '+++++++++');
  const [likes, setLikes] = useState(() => {
    // Initialize likes state based on the data fetched
    const initialLikes = {};
    data.forEach((meal) => {
      initialLikes[meal._id] = meal.likes || 0;
    });
    return initialLikes;
  });

  
  const handleLike = (id) => {
    if (!userDta) {
      Swal.fire({
        title: 'You Are Not Login!',
        text: 'You are not logged in, please ensure your account by logging in first.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'I want to login my account',
      }).then(async (result) => {
        if (result.isConfirmed) {
          naviget('/login');
        }
      });
      return;
    }
    if (!isPay) {
      Swal.fire({
        title: 'You have not subscription!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'I want to subscription',
      }).then(async (result) => {
        if (result.isConfirmed) {
          naviget('/');
        }
      });
      return;
    }

    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      newLikes[id] = newLikes[id] === 0 ? 1 : 0;
      return newLikes;
    });
  };




  const handleSearchClick = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    // console.log(text);
    setSearch(text);
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    // console.log(text);
    setSearch(text);
  };
  return (
    <div>
      <div
        className="h-60 bg-pClr"
        style={{
          backgroundImage: `url('https://i.ibb.co/hcxp8J7/fdsfd-min.png')`,
        }}
      ></div>
      <div className="w-11/12 xl:w-10/12 max-w-[1700px] mx-auto">
        <div className="py-5 bg-slate-500 mt-6 rounded-md px-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <FilterSearching handleFilter={handleFilter} />
          {filter && (
            <div className="hidden lg:block py-1 w-48 text-center border rounded-md px-2">
              <h1 className="text-xl font-medium">
                Result: <span className="font-bold">({data.length})</span>
                Meals
              </h1>
            </div>
          )}
          <form
            onSubmit={handleSearchClick}
            className="w-full md:w-auto relative"
          >
            <input
              onChange={handleSearch}
              type="text"
              name="search"
              placeholder="Search your meals"
              className="rounded px-4 py-[7px] w-full md:w-80 max-w-full md:max-w-80 text-slate-600 focus:outline-none pr-20"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-2 rounded-md bg-pClr text-slate-50 px-2 font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="mb-16 mt-5">
            <UpcomingMealSke />
          </div>
        ) : (
          <div className="mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-5 mb-16 mt-5">
            {data.length < 1 ? (
              <div className="text-slate-100 m-14 text-center border border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto col-span-4">
                <h1 className="font-bold">No results found !</h1>
              </div>
            ) : (
              data.map((dta) => (
                <div
                  key={dta._id}
                  className=" mx-auto max-w-[390px] w-full rounded-lg bg-white font-sans shadow-lg dark:bg-[#18181B]"
                >
                  {/* Post Image */}
                  <div className="flex flex-col gap-1">
                    <div
                      className="w-full bg-cover h-52 bg-center rounded-t-md"
                      style={{
                        backgroundImage: `url(${
                          dta?.mealImage ||
                          'https://i.ibb.co/t8j2kD5/sdfsaf.jpg'
                        })`,
                      }}
                    ></div>
                  </div>
                  {/* Post content */}
                  <div className="mt-3 space-y-2 px-4 min-h-24">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white/90">
                      {dta?.title}
                    </h2>
                    <h2 className="text-sm text-gray-500 dark:text-white/50">
                      {dta?.description.slice(0, 110)}...{' '}
                      <span className="cursor-pointer text-[#3e96d4]">
                        See more
                      </span>
                    </h2>
                  </div>
                  {/* icons */}
                  <div className="mt-4 flex justify-between px-4 pb-4">
                    <div
                      onClick={() => handleLike(dta._id)}
                      className="flex items-center gap-2 cursor-pointer select-none"
                    >
                      <span className="text-2xl">
                        <RiHeart2Line />
                      </span>
                      <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
                        {likes[dta._id]}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className="text-2xl">
                        <TbShare />
                      </span>
                      <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
                        34
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className="text-[27px]">
                        <BiMessageRoundedDots />
                      </span>
                      <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
                        40
                      </h2>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMeals;
