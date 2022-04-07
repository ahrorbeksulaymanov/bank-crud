import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import aboutImg from "../../assets/images/about-img.jpg";
import ModalVideo from "react-modal-video";
import './style.scss'
import { BsPlayCircle } from "react-icons/bs";

SwiperCore.use([Pagination, Autoplay]);
const SliderTeamMembers = () => {
  const [width, setWidth] = useState(0);
  const [slideItem, setslideItem] = useState(4);
  const [sliderHeight, setsliderHeight] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [action, setaction] = useState({isOpen:false, id:null});
  const data = [
    {
      id: 1,
      link: "SaYOCITaX-Q",
    },
    {
      id: 1,
      link: "4EfM6rPmxow",
    },
    {
      id: 1,
      link: "C8qBigNV1xs",
    },
    {
      id: 1,
      link: "UKKPzn-4QA0",
    },
  ];

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
      setslideItem(2);
      setsliderHeight("190px");
    } else if (width < 768 && width > 500) {
      setslideItem(2);
      setsliderHeight("140px");
    } else if (width < 500) {
      setslideItem(1);
      setsliderHeight("220px");
    } else {
      setslideItem(3);
      setsliderHeight("200px");
    }
  }, [width]);
  return (
    <div className="pb-5">
      <h5 className="text-center my-4">
        Jamoamiz azolari
      </h5>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={false}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={slideItem}
        navigation={true}
        loop={true}
        spaceBetween={30}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="aboutSliderItem">
                <div>
                    <BsPlayCircle className='play_icon' onClick={() => setaction({isOpen:true, id:item.link})} />
                </div>
                <img className="w-100" src={aboutImg} style={{height:sliderHeight}} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={action.isOpen}
        videoId={action.id}
        onClose={() => setaction({isOpen:false, id:null})}
      />
    </div>
  );
};
export default SliderTeamMembers;
