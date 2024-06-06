import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealCard from './MealCard';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const { data: meals = [] } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const { data } = await axiosPub.get(`/meals`);
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
            <MealCard key={dta._id} dta={dta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
