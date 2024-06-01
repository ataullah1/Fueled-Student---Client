const slide1 =
  'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1717227266~exp=1717230866~hmac=84538ed341e3d569c716a085f8f7ca83fc8e3695c738c311ab06c911a6cae778&w=900';
const slide2 =
  'https://img.freepik.com/premium-photo/vegetable-salad-with-spinach-tomatoes-paprika-pumpkin-seeds-plate-wooden-background-top-view-free-space-your-text-flat-lay_187166-57480.jpg?w=900';
const slide3 =
  'https://img.freepik.com/premium-photo/set-seafood-dishes-black-background-pasta-bulgur-rice-couscous-top-view-free-space-your-text_187166-18264.jpg?w=1060';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';

const Banner = () => {
  return (
    <div className="h-[400px] md:min-h-screen">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3300,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Keyboard]}
        className="mySwiper h-[400px] md:min-h-screen relative"
      >
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide3})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            ></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="h-[400px] md:min-h-screen absolute top-0 left-0 z-10 w-full flex items-center justify-center ">
        <h1 className="bannerFont text-4xl md:text-7xl text-white text-center max-w-[750px] mx-auto px-4">
          Lorem ipsum dolor sit amet consectetur.
        </h1>
      </div>
    </div>
  );
};

export default Banner;
