import { PropTypes } from 'prop-types';

const MealsCard = ({ data }) => {
  return (
    <div className="max-w-[550px] p-2 bg-slate-100 text-slate-800 rounded-md">
      <div
        className="bg-cover bg-center h-60 rounded-md w-full bg-green-400"
        style={{
          backgroundImage: `url('https://i.ibb.co/PwXW3g8/sdfsaf.jpg')`,
        }}
      ></div>
      <div className=" w-full ">
        <div className=" w-full ">
          <h1 className="text-2xl">{data?.title}</h1>
          <div className="flex justify-between items-center w-full">
            <div className="min-w-32 rounded-md py-1.5 px-2 bg-yellow-200">{data?.rating}</div>
            <div className="min-w-32 rounded-md py-1.5 px-2 bg-green-300">
              {data?.price < 10 ? `0${data?.price}` : data.price}
            </div>
          </div>
        </div>
        <div className="w-full">
          <button className="w-full py-2 bg-pClr text-slate-100 font-bold rounded-md active:scale-95 hover:-translate-y-1 duration-300">
            Go to details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealsCard;
MealsCard.propTypes = {
  data: PropTypes.object,
};
