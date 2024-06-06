import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealCard from './MealCard';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const itemper = 2;

  // Fetch total number of meals
  const { data: mealLen = '' } = useQuery({
    queryKey: ['mealLen'],
    queryFn: async () => {
      const { data } = await axiosPub.get('/meals-len');
      return data.finalRes;
    },
  });

  // Fetch meals for infinite scroll
  const { data: newMeals } = useQuery({
    queryKey: ['meals', page],
    queryFn: async () => {
      const { data } = await axiosPub.get(
        `/meals?page=${page}&itemper=${itemper}`
      );
      return data;
    },
    enabled: page > 1, // Only enable fetching when page > 1
  });

  // Initial fetch of meals when component mounts
  useEffect(() => {
    const fetchInitialMeals = async () => {
      const { data } = await axiosPub.get(`/meals?page=1&itemper=2`);
      setMeals(data);
    };
    fetchInitialMeals();
  }, [axiosPub]);

  // Append new meals to the existing list
  useEffect(() => {
    if (newMeals) {
      setMeals((prevMeals) => [...prevMeals, ...newMeals]);
    }
  }, [newMeals]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="h-60 bg-yellow-500"></div>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="py-8 bg-slate-500 mt-6 rounded-t-md">
          <h1 className="px-5 text-2xl">{meals?.length}</h1>
        </div>
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
            className="mb-16 mt-5 flex flex-col gap-5 overflow-x-hidden"
          >
            {meals.map((dta) => (
              <MealCard key={dta._id} dta={dta} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Meals;
