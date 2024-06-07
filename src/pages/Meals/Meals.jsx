import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealCard from './MealCard';
import FilterSearching from '../../utility/FilterSearching';
import { useState } from 'react';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const [filter, handleFilter] = useState('');
  console.log(filter);
  // Fetch meals for infinite scroll
  const { data: meals = [] } = useQuery({
    queryKey: ['meals', filter],
    queryFn: async () => {
      const { data } = await axiosPub.get(`/meals?filter=${filter}`);
      return data;
    },
  });

  // const handleFilter = (e) => {
  //   console.log(e);
  //   setFilter(e);
  // };

  const handleSearch = (e) => {
    const text = e.target.value;
    console.log(text);
  };

  return (
    <div>
      <div className="h-60 bg-yellow-500"></div>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="py-5 bg-slate-500 mt-6 rounded-md px-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <FilterSearching handleFilter={handleFilter} />
          {filter && (
            <div className="hidden lg:block py-1 w-48 text-center border rounded-md px-2">
              <h1 className="text-xl font-medium">
                Result: <span className="font-bold">({meals.length})</span>{' '}
                Meals
              </h1>
            </div>
          )}
          <form onChange={handleSearch} className="w-full md:w-auto relative">
            <input
              type="text"
              name="search"
              placeholder="Search your meals"
              className="rounded px-4 py-[7px] w-full md:w-80 max-w-full md:max-w-80 text-slate-600 focus:outline-none pr-20"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 rounded-md bg-pClr text-slate-50 px-2 font-semibold">
              Search
            </button>
          </form>
        </div>
        <div className="mb-16 mt-5 flex flex-col gap-6">
          {meals.map((dta) => (
            <MealCard key={dta._id} dta={dta} />
          ))}
        </div>
        {/* <div className="">
          <InfiniteScroll
            dataLength={meals.length}
            next={fetchMoreData}
            hasMore={meals.length < mealLen}
            loader={
              <div className="overflow-hidden flex items-center gap-3 justify-center">
                <CgSpinnerTwoAlt className="animate-spin text-4xl overflow-x-hidden" />
                <CgSpinnerTwoAlt className="animate-spin text-4xl overflow-x-hidden" />
                <CgSpinnerTwoAlt className="animate-spin text-4xl overflow-x-hidden" />
              </div>
            }
            className="mb-16 mt-5 flex flex-col gap-6 overflow-x-hidden"
          >
            {meals.map((dta) => (
              <MealCard key={dta._id} dta={dta} />
            ))}
          </InfiniteScroll>
        </div> */}
      </div>
    </div>
  );
};

export default Meals;
