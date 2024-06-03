import { PropTypes } from 'prop-types';
import { FaDollarSign, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MealsCard = ({ data }) => {
  return (
    <div className="max-w-[500px] mx-auto w-full p-2 bg-slate-100 text-slate-800 rounded-md">
      <div
        className="bg-cover bg-center h-60 rounded-md w-full bg-green-400 relative"
        style={{
          backgroundImage: `url('https://i.ibb.co/PwXW3g8/sdfsaf.jpg')`,
        }}
      >
        <div className="bg-[#fa973ab3] text-white absolute top-3 right-3 rounded-full px-2 flex items-center gap-1">
          <FaRegStar /> {data?.rating}
        </div>
        <h1 className="bg-[#00000060] text-white absolute top-2 left-2 rounded-full px-2 flex items-center gap-1 text-2xl font-bold">
          <FaDollarSign />
          {data?.price < 10 ? `0${data?.price}` : data.price}
        </h1>
      </div>
      <div className=" w-full ">
        <div className="w-full min-h-24 pt-4 pb-3">
          <h1 className="text-2xl font-bold">
            {data?.title.slice(0, 50)} {data?.title.length > 54 && '...'}
          </h1>
        </div>
        <div className="w-full">
          <Link to={`/meal/${data._id}`}>
            <button className="w-full py-2 bg-pClr text-slate-100 font-bold rounded-md active:scale-95 hover:-translate-y-1 duration-300">
              Go to details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealsCard;
MealsCard.propTypes = {
  data: PropTypes.object,
};
