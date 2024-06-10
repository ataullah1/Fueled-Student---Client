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

const UpcomingMeals = () => {
  const { userDta } = useAuth();
  const naviget = useNavigate();
  const axiosSec = useAxiosSec();
  const isPay = usePayment();
  const { data = [] } = useQuery({
    queryKey: ['upcoming-meals'],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/upcoming-meals`);
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

  return (
    <div>
      <div className="h-60 bg-yellow-500"></div>
      <div className="w-11/12 xl:w-10/12 max-w-[1700px] mx-auto pb-8 pt-16">
        <div className=" mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {data.map((dta) => (
            <div
              key={dta._id}
              className=" mx-auto mb-5 max-w-[350px] w-full rounded-lg bg-white font-sans shadow-lg dark:bg-[#18181B]"
            >
              {/* Post Image */}
              <div className="flex flex-col gap-1">
                <div
                  className="w-full bg-cover h-52 bg-center"
                  style={{
                    backgroundImage: `url(${
                      dta?.mealImage || 'https://i.ibb.co/t8j2kD5/sdfsaf.jpg'
                    })`,
                  }}
                ></div>
              </div>
              {/* Post content */}
              <div className="mt-3 space-y-2 px-4">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeals;
