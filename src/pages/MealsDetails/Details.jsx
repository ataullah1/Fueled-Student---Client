import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSec from '../../Hooks/useAxiosSec';
import { IoMdTime } from 'react-icons/io';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import useAxiosPub from '../../Hooks/useAxiosPub';
import useAuth from '../../Hooks/useAuth';

const Details = () => {
  const { userDta } = useAuth();
  const [like, setLike] = useState(false);
  const axiosSec = useAxiosSec();
  const axiosPub = useAxiosPub();
  const { id } = useParams();
  //   console.log('Details Id:', id);

  const { data = {}, refetch } = useQuery({
    queryKey: ['meals', id],
    queryFn: async () => {
      const { data } = await axiosPub.get(`/details/${id}`);
      return data;
    },
  });
  console.log(data);

  const { mutateAsync } = useMutation({
    mutationFn: async (countData) => {
      const { data } = await axiosSec.put('/like-count', countData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const timeAgo = (postDate, postTime) => {
    const postDateTime = new Date(`${postDate}T${postTime}Z`);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = now - postDateTime;

    // Calculate the difference in hours and days
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    // Determine the appropriate display message
    if (diffInHours < 24) {
      return `${
        isNaN(Math.floor(diffInHours)) ? '0' : Math.floor(diffInHours)
      } hours ago`;
    } else {
      return `${
        isNaN(Math.floor(diffInDays)) ? '0' : Math.floor(diffInDays)
      } days ago`;
    }
  };

  const {
    likes = '00',
    mealImage,
    mealType,
    postDate,
    postTime,
    price = '00',
    rating,
    _id,
    title,
    adminName,
    description,
    ingredients = [],
  } = data;
  const time = timeAgo(postDate, postTime);
  let likeCount = likes;

  const handleLike = async () => {
    setLike(!like);
    console.log(!like);
    const email = userDta.email;
    if (!like) {
      const count = 1;
      const countLike = 1;
      const countData = { id, count, email, countLike };
      // console.log(countData);
      await mutateAsync(countData);
      console.log('Count barbeeeeeeeeee');
    } else {
      const count = -1;
      const countLike = 0;
      const countData = { id, count, email, countLike };
      // console.log(countData);
      await mutateAsync(countData);
      console.log('count Combeeeeeeeee');
    }
  };
  return (
    <div>
      <div
        className="w-full bg-yellow-700 h-72 sm:h-96 bg-cover bg-bottom "
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/interior-luxury-restaurant-generative-ai_220873-20247.jpg?w=1060')`,
        }}
      ></div>
      <div className="rounded-md max-w-[750px] mx-auto -mt-48 w-11/12 shadow-md shadow-slate-100">
        <div className="p-3 rounded-t-md pb-0 bg-slate-100">
          <div
            className="w-full h-60 sm:h-80 rounded-t-md  bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                mealImage ? mealImage : 'https://i.ibb.co/PwXW3g8/sdfsaf.jpg'
              })`,
            }}
          ></div>
        </div>
        <div className="p-5 pt-2">
          <div>
            <div className="flex items-center justify-between">
              <div className="text-slate-400 flex items-center gap-1">
                <IoMdTime />
                <span>{time}</span>
              </div>

              <div className="flex items-center gap-2 text-xl py-2">
                {likeCount}
                <span
                  className={`text-3xl cursor-pointer hover:text-pClr hover:scale-125 active:scale-95 duration-200 ${
                    like && 'text-pClr'
                  }`}
                  onClick={handleLike}
                >
                  {like ? <FaHeart /> : <FaRegHeart />}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>

            <div className="w-full py-5 rounded-md">
              <table className="w-full border border-slate-600 rounded-md">
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Price
                  </td>
                  <td className="px-5">
                    $ {price < 10 ? `0${price}` : price}{' '}
                  </td>
                </tr>
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Meal Type
                  </td>
                  <td className="px-5 capitalize">{mealType}</td>
                </tr>
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Ingredients
                  </td>
                  <td className="px-5 capitalize">{ingredients.join(', ')}</td>
                </tr>
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Distributor
                  </td>
                  <td className="px-5">{adminName} </td>
                </tr>
              </table>
            </div>
            <h3 className="text-2xl py-2 font-semibold">Description:</h3>
            <p>{description}</p>
          </div>
          <div>
            <div></div>
            <button></button>
          </div>

          <div className="h-[1px] bg-slate-600 w-full my-8"></div>
          {/* Review Part */}
          <h2 className="text-2xl font-semibold">Reviews:</h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
