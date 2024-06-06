import { Rating } from '@smastrom/react-rating';
import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import { LuDot } from 'react-icons/lu';
import timeAgo from '../../time';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const { data: meals = [] } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const { data } = await axiosPub.get('/meals');
      return data;
    },
  });
  return (
    <div>
      <div className="h-60 bg-yellow-500"></div>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="py-8 bg-slate-500 mt-6 rounded-t-md"></div>
        <div className="mb-16 mt-5 flex flex-col gap-5">
          {meals.map((dta) => (
            <div
              key={dta._id}
              className="flex rounded-md p-3 bg-slate-200 gap-1"
            >
              <div className="w-full md:w-1/4 rounded-md">
                <div
                  className="w-full h-full bg-cover bg-center rounded-l-md bg-yellow-200"
                  style={{
                    backgroundImage: `url('https://i.ibb.co/bsVvWDG/bowl-menudo-served-with-side-sliced-avocado-974629-221980.jpg')`,
                  }}
                ></div>
              </div>
              <div className="w-full md:w-3/4 bg-slate-700 rounded-r-md p-3 flex">
                <div className="w-3/4 space-y-2">
                  <h1 className="text-3xl font-bold">{dta?.title}</h1>
                  <div className="flex items-center gap-2">
                    <Rating
                      style={{ maxWidth: 120 }}
                      value={dta?.rating || 0}
                      readOnly
                    />
                    <span className="text-base">(43)</span>
                  </div>
                  <div className="flex items-center flex-wrap text-slate-400">
                    {dta?.ingredients.map((ing, i) => (
                      <span key={i} className="flex items-center">
                        {ing}
                        <span className="text-pClr text-xl">
                          <LuDot />
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="">{dta?.description.slice(0, 70)}....</p>
                </div>
                <div className="w-1/4 pl-3 border-l border-slate-500">
                  <p className="text-right">
                    <p className="text-right inline-block text-slate-400 border-l border-b px-2 rounded-bl border-slate-400">
                      {timeAgo(dta.postDate)}
                    </p>
                  </p>
                  <h1 className="text-3xl font-bold py-3">${dta?.price}</h1>

                  <div className="flex flex-col gap-2">
                    <button className="py-1 w-full rounded-md text-base font-bold bg-pClr text-slate-100 ">
                      DETAILS
                    </button>
                    <button className="py-1 w-full rounded-md text-base font-bold border-2 border-pClr uppercase">
                      ADD request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
