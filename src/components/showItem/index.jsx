import React, { useState, useEffect } from "react";
import product2 from "../../assets/images/product2.jpg";
import { IoIosArrowBack } from "react-icons/io";
import "./style.scss";
import { Select, Collapse } from "antd";
import SubmitData from "./submitDataModal";
import SliderSimiliar from "./sliderSimiliar";
import ShowItemMobile from "./sliderShowMobile";
import { Link, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {PATH_API, PATH_API_FILE} from '../../constants/index'
const { Panel } = Collapse;
const { Option } = Select;

const ItemShow = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [features, setfeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const match = useRouteMatch("/product/:id");
  const [imgIndex, setimgIndex] = useState(0);

  const history = useHistory()
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/product/${match.params.id}?expand=createdBy,updatedBy,brand,size,gender,discount,season,category`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res?.status === 200) {
        console.log("features",res?.data?.data);
        setData(res?.data?.data);
        setLoading(false);
      }
    });
    axios({
      url: PATH_API + `/product/get-features/${match.params.id}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res?.status === 200) {
        setfeatures(res?.data?.data)
      }
    });
  }, []);

  return (
    <div className="show-items pt-4">
      <div className="row">
        <div className="col-md-7 d-none-md">
          <p className="d-flex align-items-center fw-600 back-button">
            <div onClick={() => history.goBack()} className="d-flex align-items-center fw-600 back-button pointer">
              <IoIosArrowBack /> Back
            </div>
          </p>
          {!loading && <img src={PATH_API_FILE + data?.photos[imgIndex]} className="w-100" alt="" />}
        </div>
        <div className="col-md-1 d-none-md">
          {!loading && data?.photos &&
          data?.photos?.map((item, index) => (
            <img key={index} onClick={() => setimgIndex(index)} src={PATH_API_FILE + item} className={`w-100 mb-4 ${imgIndex === index && 'litle-img'}`} alt="" />
          ))}
        </div>
        <ShowItemMobile />
        <div className="col-md-4">
          <h3 className="m-0"><Link to='/company/:id' className="text-dark">{data?.brand?.brnadName}</Link></h3>
          <p className="m-0">{data?.name}</p>
          <p className="">Colour ellow</p>
          {
            data?.discount ? 
            <>
              <p className="comp-sale mb-1">
                <span className="through">{data?.salePrice}</span>{" "}
                <span className="text-danger ms-2">-{data?.discount?.percent}%</span>
              </p>
              <p className="comp-price m-0 text-danger">{data?.salePrice - (data?.salePrice*data?.discount?.percent/100)}</p>
            </>:
            <p className="comp-price m-0 text-danger">{data?.salePrice}</p>
          }
          <p className="text-secondary">{data?.shortDescription}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <p className="m-0 text-secondary">O'lchami</p>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div></div>
          </div>
          <button
            className="offer-button"
            onClick={() => setIsModalVisible(true)}
          >
            Buyurtma berish
          </button>
          <p className="text-secondary">Boshqa ranglari</p>
          <img
            src={product2}
            className="me-4"
            style={{ width: "80px" }}
            alt=""
          />
          <img src={product2} className="" style={{ width: "80px" }} alt="" />
          <Collapse
            bordered={false}
            style={{ backgroundColor: "transparent" }}
            expandIconPosition="right"
          >
            {
              features?.map((item, index) => (
                <Panel header={item?.name} key={index+1}>{item?.description}</Panel>
              ))
            }
          </Collapse>
        </div>
      </div>
      <p className="mt-4 text-secondary">{data?.description}</p>
      <SubmitData isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} id={match.params.id} />
      <SliderSimiliar />
    </div>
  );
};
export default ItemShow;
