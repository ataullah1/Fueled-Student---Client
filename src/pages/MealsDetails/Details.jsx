import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSec from '../../Hooks/useAxiosSec';

const Details = () => {
  const axioss = useAxiosSec();
  const { id } = useParams();
  //   console.log('Details Id:', id);
  const { data = {} } = useQuery({
    queryKey: ['meals', id],
    queryFn: async () => {
      const { data } = await axioss.get(`/details/${id}`);
      return data;
    },
  });
  console.log(data);

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
    likes,
    mealImage,
    mealType,
    postDate,
    postTime,
    price,
    rating,
    _id,
    title,
    adminName,
    description,
    ingredients,
  } = data;
  const time = timeAgo(postDate, postTime);
//   console.log(time);
  return (
    <div>
      <div
        className="w-full bg-yellow-700 h-72 bg-cover bg-bottom "
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/interior-luxury-restaurant-generative-ai_220873-20247.jpg?w=1060')`,
        }}
      ></div>
      <div className="rounded-md max-w-[750px] mx-auto -mt-32 w-11/12 shadow-md shadow-slate-100">
        <div className="p-3 rounded-t-md pb-0 bg-slate-100">
          <div
            className="w-full h-60 sm:h-72 rounded-t-md  bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.ibb.co/s9StCs7/cvr-min.png')`,
            }}
          ></div>
        </div>
        <div className="p-5 pt-2-">
          <div className='text-slate-400'>
            <span>{time}</span>
          </div>
          <h1 className="text-slate-100">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            sint blanditiis autem eum illo nihil eos enim voluptatibus, sapiente
            iusto, nostrum placeat temporibus? Harum autem praesentium nulla
            eius tempora? Fugit numquam voluptatibus adipisci consequatur harum?
            Repellat deleniti obcaecati delectus ad.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
