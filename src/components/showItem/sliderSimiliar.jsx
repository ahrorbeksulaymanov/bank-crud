import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import product2 from "../../assets/images/product2.jpg";

const SliderSimiliar = () => {
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
        <h4 className="text-center my-4">Sizga yoqishi mumkin bo'lgan tovarlar</h4>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={slideItem}
        navigation={true}
        loop={true}
        spaceBetween={30}
      >
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={product2} className='w-100' alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default SliderSimiliar;
