import useAdmin from '../../Hooks/useAdmin';
import Banner from '../../components/Banner/Banner';
import MealsbyCategory from '../../components/MealsbyCategory/MealsbyCategory';

const Home = () => {
  const isAdmin = useAdmin();
  console.log(isAdmin);
  return (
    <div>
      <Banner />

      <div className="w-11/12 mx-auto max-w-[1700px]">
        <MealsbyCategory />
      </div>
    </div>
  );
};

export default Home;
