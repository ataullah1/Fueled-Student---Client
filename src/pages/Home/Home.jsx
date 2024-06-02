import Banner from '../../components/Banner/Banner';
import MealsbyCategory from '../../components/MealsbyCategory/MealsbyCategory';

const Home = () => {
  return (
    <div>
      <Banner />

      <div className="w-11/12 mx-auto">
        <MealsbyCategory />
      </div>
    </div>
  );
};

export default Home;
