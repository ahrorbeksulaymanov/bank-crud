import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "./style.scss";
import { Select, Collapse } from "antd";
import SubmitData from "./submitDataModal";
import SliderSimiliar from "./sliderSimiliar";
import ShowItemMobile from "./sliderShowMobile";
import { Link, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants/index";
const { Panel } = Collapse;
const { Option } = Select;

const ItemShow = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [features, setfeatures] = useState([]);
  const [similiarData, setsimiliarData] = useState([]);
  const [images, setimages] = useState([]);
  const [modalSelects, setmodalSelects] = useState({
    colors: [],
    sizes: [],
  });
  const [categoryId, setcategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setrefresh] = useState(true);
  const match = useRouteMatch("/product/:id");
  const [imgIndex, setimgIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url:
        PATH_API +
        `/product/${match.params.id}?expand=brand,size,gender,discount,season,category,colors`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res?.status === 200) {
        setcategoryId(res?.data?.data?.category?.id);
        setData(res?.data?.data);
        const imgs = [];
        res?.data?.data?.photos?.map((i) => {
          imgs.push(PATH_API_FILE + i);
        });
        setmodalSelects({
          colors: res?.data?.data?.colors,
          sizes: res?.data?.data?.size,
        });
        setimages(imgs);
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
        setfeatures(res?.data?.data);
      }
    });
  }, [refresh]);

  useEffect(() => {
    const json = {};
    json.categoryId = String(categoryId);
    axios({
      url:
        PATH_API +
        `/product?expand=discount&filter=${JSON.stringify(json).slice(
          1,
          -1
        )}&order=updated_at~desc`,
      method: "GET",
    }).then((res) => {
      if (res?.status === 200) {
        setsimiliarData(res?.data?.data);
      }
    });
  }, [categoryId]);

  return (
    <div className="show-items pt-4">
      <div className="row">
        <div className="col-md-7 d-none-md">
          <p className="d-flex align-items-center fw-600 back-button">
            <div
              onClick={() => history.goBack()}
              className="d-flex align-items-center fw-600 back-button pointer"
            >
              <IoIosArrowBack /> Back
            </div>
          </p>
          {!loading && (
            <img
              src={PATH_API_FILE + data?.photos[imgIndex]}
              className="w-100"
              alt=""
            />
          )}
        </div>
        <div className="col-md-1 d-none-md">
          {!loading &&
            data?.photos &&
            data?.photos?.map((item, index) => (
              <img
                key={index}
                onClick={() => setimgIndex(index)}
                src={PATH_API_FILE + item}
                className={`w-100 mb-4 ${imgIndex === index && "litle-img"}`}
                alt=""
              />
            ))}
        </div>
        <ShowItemMobile data={images} />
        <div className="col-md-4">
          <h3 className="m-0">
            <Link
              to={{
                pathname: `/company/${data?.brand?.id}`,
                brand: { name: data?.brand?.brnadName, photo: "" },
              }}
              className="text-dark"
            >
              {data?.brand?.brnadName}
            </Link>
          </h3>
          <p className="m-0">{data?.name}</p>
          {/* <p className="">Colour ellow</p> */}
          {data?.discount ? (
            <>
              <p className="comp-sale mb-1">
                <span className="through">{data?.salePrice}</span>{" "}
                <span className="text-danger ms-2">
                  -{data?.discount?.percent}%
                </span>
              </p>
              <p className="comp-price m-0 text-danger">
                {data?.salePrice -
                  (data?.salePrice * data?.discount?.percent) / 100}
              </p>
            </>
          ) : (
            <p className="comp-price m-0 text-danger">{data?.salePrice}</p>
          )}
          <p className="text-secondary">{data?.shortDescription}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <p className="m-0 text-secondary">O'lchami</p>
              <Select allowClear style={{ width: 120 }} placeholder="O'lcham">
                {data?.size?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item?.name}
                  </Option>
                ))}
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
          {data?.colors?.map((item, index) => (
            <div
              key={index}
              className="me-2"
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: item?.colorHex,
                display: "inline-block",
              }}
            ></div>
          ))}
          <Collapse
            bordered={false}
            style={{ backgroundColor: "transparent" }}
            expandIconPosition="right"
          >
            {features?.map((item, index) => (
              <Panel header={item?.name} key={index + 1}>
                {item?.description}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
      <p className="mt-4 text-secondary">{data?.description}</p>
      <SubmitData
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={match.params.id}
        modalSelects={modalSelects}
      />
      <SliderSimiliar
        data={similiarData}
        setrefresh={setrefresh}
        refresh={refresh}
      />
    </div>
  );
};
export default ItemShow;
