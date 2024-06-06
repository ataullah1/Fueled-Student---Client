import { useQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealCard from './MealCard';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const [page, setPage] = useState(1);
  const [itemper, setItemper] = useState(3);
  const { data: meals = [] } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const { data } = await axiosPub.get(
        `/meals?page=${page}&itemper=${itemper}`
      );
      return data;
    },
  });
  return (
    <div>
      <div className="h-60 bg-yellow-500"></div>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="py-8 bg-slate-500 mt-6 rounded-t-md">
          <h1 className="px-5 text-2xl">{meals?.length}</h1>
        </div>
        <div className="mb-16 mt-5 flex flex-col gap-5">
          {/* {meals.map((dta) => (
            <MealCard key={dta._id} dta={dta} />
          ))} */}

          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
            inverse={true} //
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {meals.state.items.map((dta) => (
              <MealCard key={dta._id} dta={dta} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Meals;
