import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealCard from './MealCard';
import FilterSearching from '../../utility/FilterSearching';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const [filter, handleFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemper = 2;
  let meals = [];
  // console.log(search);

  // // Fetch total number of meals
  // const { data: mealLen = 0 } = useQuery({
  //   queryKey: ['mealLen'],
  //   queryFn: async () => {
  //     const { data } = await axiosPub.get('/meals-len');
  //     return data.finalRes;
  //   },
  // });
  // const fetchMoreData = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };
  // Fetch meals for infinite scroll
  if (!search || !filter) {
    // Fetch meals for infinite scroll
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { data: newMeals } = useQuery({
    //   queryKey: ['meals', page],
    //   queryFn: async () => {
    //     const { data } = await axiosPub.get(
    //       `/meals?page=${page}&itemper=${itemper}`
    //     );
    //     return data;
    //   },
    //   enabled: page > 1, // Only enable fetching when page > 1
    // });

    // // Initial fetch of meals when component mounts
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //   const fetchInitialMeals = async () => {
    //     const { data } = await axiosPub.get(`/meals?page=1&itemper=2`);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     meals = data;
    //   };
    //   fetchInitialMeals();
    // }, [axiosPub]);

    // // Append new meals to the existing list
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //   if (newMeals) {
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     meals = (prevMeals) => [...prevMeals, ...newMeals];
    //   }
    // }, [newMeals]);

    // =========================
    const { data: meal = [] } = useQuery({
      queryKey: ['meals', filter, search],
      queryFn: async () => {
        const { data } = await axiosPub.get(
          `/meals?filter=${filter}&search=${search}`
        );
        return data;
      },
    });
    meals = meal;

    // =========================
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: meal = [] } = useQuery({
      queryKey: ['meals', filter, search],
      queryFn: async () => {
        const { data } = await axiosPub.get(
          `/meals?filter=${filter}&search=${search}`
        );
        return data;
      },
    });
    meals = meal;
    console.log(meals);
  }

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
      <div className="h-60 bg-yellow-500"></div>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="py-5 bg-slate-500 mt-6 rounded-md px-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <FilterSearching handleFilter={handleFilter} />
          {filter && (
            <div className="hidden lg:block py-1 w-48 text-center border rounded-md px-2">
              <h1 className="text-xl font-medium">
                Result: <span className="font-bold">({meals.length})</span>
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
        {/* {filter && search ? ( */}
          <div className="mb-16 mt-5 flex flex-col gap-6">
            {meals.map((dta) => (
              <MealCard key={dta._id} dta={dta} />
            ))}
          </div>
        {/* ) : (
          <div className="">
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
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Meals;
