import { useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../Hooks/useAxiosSec';
import { RiHeart2Line } from 'react-icons/ri';
import { TbShare } from 'react-icons/tb';
import { BiMessageRoundedDots } from 'react-icons/bi';

const UpcomingMeals = () => {
  const axiosSec = useAxiosSec();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['upcoming-meals'],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/upcoming-meals`);
      // console.log(data);
      return data;
    },
  });
  console.log(data);

  const handleLike = () => {
    console.log('Like');
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
                  onClick={handleLike}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <span className="text-2xl">
                    <RiHeart2Line />
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
                    {dta?.likes}
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
