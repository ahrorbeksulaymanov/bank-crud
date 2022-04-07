import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { PATH_API_FILE } from "../../constants";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, Autoplay]);
const SliderSimiliar = ({data, setrefresh, refresh}) => {
  const [width, setWidth] = useState(0);
  const [slideItem, setslideItem] = useState(4);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (width < 992 && width > 768) {
      setslideItem(3);
    } else if (width < 768 && width > 500) {
      setslideItem(2);
    } else if (width < 500) {
      setslideItem(1);
    } else {
      setslideItem(4);
    }
  }, [width]);
  return (
    <div className="pb-5">
        <h5 className="text-center my-4">Sizga yoqishi mumkin bo'lgan tovarlar</h5>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={slideItem}
        navigation={true}
        loop={true}
        spaceBetween={30}
      >
        {data?.map((item, index) => (
        <SwiperSlide key={index}>
          <Link to={`/product/${item?.id}`}>
            <img onClick={() => setrefresh(!refresh)} src={PATH_API_FILE + item?.photos[0]} className='w-100 similiar_img' alt="" />
          </Link>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SliderSimiliar;
