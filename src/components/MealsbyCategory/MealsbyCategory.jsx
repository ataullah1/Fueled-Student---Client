import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

const MealsbyCategory = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-5xl font-bold"> Meals by Category</h1>

      <div>
        <Tabs>
          <TabList className="flex flex-col sm:flex-row items-center justify-center border-2 rounded-md p-2 sm:rounded-full py-1 max-w-[700px] mx-auto text-slate-800 gap-1">
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              All Meals
            </Tab>
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              Breakfast
            </Tab>
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              Lunch
            </Tab>
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              Dinner
            </Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 4</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MealsbyCategory;
