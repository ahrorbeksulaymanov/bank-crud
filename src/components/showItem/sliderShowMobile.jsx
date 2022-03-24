import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
import './style.scss'
import product2 from "../../assets/images/product2.jpg";
const ShowItemMobile = () => {
  return (
    <div className="d-block-md mobile-slider">
      <Swiper
      loop={true}
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
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
export default ShowItemMobile;
