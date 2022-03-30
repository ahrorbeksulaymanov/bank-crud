import React, { useEffect, useState } from "react";
import mainLeftImg from "../../assets/images/main-left.jpg";
import mainRight1Img from "../../assets/images/main-r1.jpg";
import mainRight2Img from "../../assets/images/main-r2.jpg";
import "./style.scss";
import SliderNews from "./slider";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";

const NewProducts = () => {
  const [data, setData] = useState([]);
  const [sliderData, setsliderData] = useState([]);
  const [LastData, setLastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/product?expand=brand`,
      method: "GET",
      params: {
        size: 20,
        page: 1,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data);
        if (res?.data?.data?.length > 8) {
          console.log("ddddddd", res?.data?.data?.slice(3, 8));
          setsliderData(res?.data?.data?.slice(3, 8));
        }
        if (res?.data?.data?.length > 17) {
          console.log("eeee", res?.data?.data?.slice(8, 17));
          setLastData(res?.data?.data?.slice(8, 17));
        }
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="py-5">
      <div className="row">
        <div className="col-md-6">
          <div className="image-sale left-main-img mb-4">
            <div>
              <p>{data[0]?.name}</p>
              <h5>{data[0]?.brand?.name}</h5>
            </div>
            <img
              className="w-100"
              src={PATH_API_FILE + data[0]?.photos[0]}
              alt=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="image-sale right-main-img mb-4">
            <div>
              <p>{data[1]?.name}</p>
              <h5>{data[1]?.brand?.name}</h5>
            </div>
            <img
              className="w-100"
              src={PATH_API_FILE + data[1]?.photos[0]}
              alt=""
            />
          </div>
          <div className="image-sale right-main-img">
            <div>
              <p>{data[2]?.name}</p>
              <h5>{data[2]?.brand?.name}</h5>
            </div>
            <img
              className="w-100"
              src={PATH_API_FILE + data[2]?.photos[0]}
              alt=""
            />
          </div>
        </div>
      </div>
      <SliderNews data={sliderData} />
      <h4 className=" mb-4">Yangi toplam</h4>
      <div className="row">
        {LastData?.map((item, index) => (
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="image-sale-smaller hover-effect">
              <div>
              <p>{item?.name}</p>
              <h5>{item?.brand?.name}</h5>
              </div>
              <img className="w-100 least_images" src={PATH_API_FILE + item?.photos[0]} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NewProducts;
