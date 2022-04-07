import React, { useEffect, useState } from "react";
import "./style.scss";
import SliderNews from "./slider";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import LoaderMain from "../../components/loader/index";
const NewProducts = () => {
  const [data, setData] = useState([]);
  const [sliderData, setsliderData] = useState([]);
  const [LastData, setLastData] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchVal = useSelector((state) => state?.product);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const json = {};
    json.search = String(searchVal?.search_val);
    json.genderId = String(searchVal?.gender_val);

    axios({
      url:
        PATH_API +
        `/product?expand=brand&order=updated_at~desc&filter=${JSON.stringify(
          json
        ).slice(1, -1)}`,
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
          setsliderData(res?.data?.data?.slice(3, 8));
        }
        if (res?.data?.data?.length > 17) {
          setLastData(res?.data?.data?.slice(8, 17));
        }
        setLoading(false);
      }
    });
  }, [searchVal]);

  return (
    <div className="py-5">
      {loading ? (
        <LoaderMain />
      ) : data?.length === 0 ? (
        <Empty description="Ma'lumot topilmadi" style={{ height: "40vh" }} />
      ) : (
        <>
          <div className="row">
            <div className="col-md-6">
              <Link to={`/product/${data[0]?.id}`}>
                <div className="image-sale left-main-img hover-effect-color mb-4">
                  <div className="title_wrapper">
                    <div>
                      <p>{data[0]?.name}</p>
                      <h5>{data[0]?.brand?.name}</h5>
                    </div>
                  </div>
                  <img
                    className="w-100"
                    src={PATH_API_FILE + data[0]?.photos[0]}
                    alt=""
                  />
                </div>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to={`/product/${data[1]?.id}`}>
                <div className="image-sale right-main-img hover-effect-color mb-4">
                  <div className="title_wrapper">
                    <div>
                      <p>{data[1]?.name}</p>
                      <h5>{data[1]?.brand?.name}</h5>
                    </div>
                  </div>
                  <img
                    className="w-100"
                    src={PATH_API_FILE + data[1]?.photos[0]}
                    alt=""
                  />
                </div>
              </Link>
              <Link to={`/product/${data[2]?.id}`}>
                <div className="image-sale right-main-img hover-effect-color">
                  <div className="title_wrapper">
                    <div>
                      <p>{data[2]?.name}</p>
                      <h5>{data[2]?.brand?.name}</h5>
                    </div>
                  </div>
                  <img
                    className="w-100"
                    src={PATH_API_FILE + data[2]?.photos[0]}
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
          <SliderNews data={sliderData} />
          <h4 className=" mb-4">Yangi to'plam</h4>
          <div className="row">
            {LastData?.map((item, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <Link to={`/product/${item?.id}`}>
                  <div className="image-sale-smaller hover-effect">
                    <div>
                      <p>{item?.name}</p>
                      <h5>{item?.brand?.name}</h5>
                    </div>
                    <img
                      className="w-100 least_images"
                      src={PATH_API_FILE + item?.photos[0]}
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default NewProducts;
