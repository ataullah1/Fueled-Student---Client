import useAdmin from '../../Hooks/useAdmin';
import Banner from '../../components/Banner/Banner';
import MealsbyCategory from '../../components/MealsbyCategory/MealsbyCategory';
import PricingSection from '../../components/PricingSection/PricingSection';
const Home = () => {
  const isAdmin = useAdmin();
  console.log(isAdmin);
  return (
    <div>
      <Banner />

      <div className="w-11/12 xl:w-10/12 mx-auto max-w-[1700px]">
        <MealsbyCategory />
      </div>
      <PricingSection />
    </div>
  );
};

export default Home;
