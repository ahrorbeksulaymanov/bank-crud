import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { BiChevronLeftSquare } from "react-icons/bi";
import { BiChevronRightSquare } from "react-icons/bi";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PATH_API_FILE } from "../../constants";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const SliderNews = ({data}) => {
  const [width, setWidth] = useState(0);
  const [slideItem, setslideItem] = useState(4);

  const handleResize = () => setWidth(window.innerWidth);
  const sliderRef = React.createRef();

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

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
    <div>
      <div className="slider_my">
        <div className="pb-4">
          <h4 className="pt-5 mb-4">Yangi to'plam</h4>
          <Swiper
            loop={true}
            className="mySwiper"
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            speed={300}
            slidesPerView={slideItem}
            spaceBetween={30}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {
              data?.map((item, index) => (
                <SwiperSlide key={index} ref={sliderRef}>
                  <Link to={`/product/${data[0]?.id}`}>
                      <div className="image-sale-smaller hover-effect-color">
                        <div className="title_wrapper">
                          <div>
                            <p>{item?.name}</p>
                            <h5>{item?.brand?.name}</h5>
                          </div>
                        </div>
                        <img className="w-100 slider_image" src={PATH_API_FILE + item?.photos[0]} alt="" />
                      </div>
                    </Link>
                </SwiperSlide>
              ))
            }
            <div className="text-end d-flex justify-content-end">
              <div ref={navigationPrevRef}>
                <BiChevronLeftSquare
                  style={{
                    fontSize: "33px",
                    color: "var(--dark)",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div ref={navigationNextRef}>
                <BiChevronRightSquare
                  style={{
                    fontSize: "33px",
                    color: "var(--dark)",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default SliderNews;
