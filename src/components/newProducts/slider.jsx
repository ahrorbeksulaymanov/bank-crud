import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { BiChevronLeftSquare } from "react-icons/bi";
import { BiChevronRightSquare } from "react-icons/bi";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import mainRight2Img from "../../assets/images/main-r2.jpg";

SwiperCore.use([Pagination, Navigation]);

const SliderNews = () => {
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
          <h4 className="pt-5 mb-4">Yangi toplam</h4>
          <Swiper
            loop={true}
            className="mySwiper"
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
            }}
            speed={800}
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
            <SwiperSlide ref={sliderRef}>
              <div className="image-sale-smaller">
                <div>
                  <p>Lorem, ipsum dolor.</p>
                  <h5>Lorem ipsum dolor sit.</h5>
                </div>
                <img className="w-100" src={mainRight2Img} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide ref={sliderRef}>
              <div className="image-sale-smaller">
                <div>
                  <p>Lorem, ipsum dolor.</p>
                  <h5>Lorem ipsum dolor sit.</h5>
                </div>
                <img className="w-100" src={mainRight2Img} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide ref={sliderRef}>
              <div className="image-sale-smaller">
                <div>
                  <p>Lorem, ipsum dolor.</p>
                  <h5>Lorem ipsum dolor sit.</h5>
                </div>
                <img className="w-100" src={mainRight2Img} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide ref={sliderRef}>
              <div className="image-sale-smaller">
                <div>
                  <p>Lorem, ipsum dolor.</p>
                  <h5>Lorem ipsum dolor sit.</h5>
                </div>
                <img className="w-100" src={mainRight2Img} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide ref={sliderRef}>
              <div className="image-sale-smaller">
                <div>
                  <p>Lorem, ipsum dolor.</p>
                  <h5>Lorem ipsum dolor sit.</h5>
                </div>
                <img className="w-100" src={mainRight2Img} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide ref={sliderRef}>
              <div className="image-sale-smaller">
                <div>
                  <p>Lorem, ipsum dolor.</p>
                  <h5>Lorem ipsum dolor sit.</h5>
                </div>
                <img className="w-100" src={mainRight2Img} alt="" />
              </div>
            </SwiperSlide>

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
