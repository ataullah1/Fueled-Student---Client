import useAdmin from '../../Hooks/useAdmin';
import Banner from '../../components/Banner/Banner';
import ContactTop from '../../components/Contact/ContactTop';
import MealsGallery from '../../components/MealsGallery/MealsGallery';
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
        <MealsGallery />
      </div>
      <PricingSection />
      <div className="w-11/12 xl:w-10/12 mx-auto max-w-[1700px]">
        <ContactTop />
      </div>
    </div>
  );
};

export default Home;
