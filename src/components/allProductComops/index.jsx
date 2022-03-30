import React, { useEffect, useState } from "react";
import { Collapse, Pagination, Modal, Slider, Spin } from "antd";
import "./style.scss";
import FilterDropdown from "./filterDropdown";
import { Card, CardBody } from "reactstrap";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";
import {
  getBrends,
  getCategories,
  getDiscount,
  getGenders,
  getSeasons,
  getSizes,
} from "../../functions";
const { Panel } = Collapse;

const AllProducts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setcategories] = useState([]);
  const [seasons, setseasons] = useState([]);
  const [genders, setgenders] = useState([]);
  const [brends, setbrends] = useState([]);
  const [sises, setsises] = useState([]);
  const [disCount, setdisCount] = useState([]);
  const [images, setimages] = useState([]);
  const [categoryId, setcategoryId] = useState(null);
  const [sizeId, setsizeId] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [image_number, setimage_number] = useState({num:0, id:null});

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    setLoading(true);
    axios({
      url: PATH_API + `/product?`,
      method: "GET",
      // params: {
      //   brandId:checkedList
      // }
    }).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data);
        setLoading(false);
      }
    });
  }, [refresh]);

  useEffect(() => {
    getCategories().then((res) => {
      if (res?.status === 200) {
        setcategories(res?.data?.data);
      }
    });

    getSeasons().then((res) => {
      if (res?.status === 200) {
        setseasons(res?.data?.data);
      }
    });

    getGenders().then((res) => {
      if (res?.status === 200) {
        setgenders(res?.data?.data);
      }
    });

    getBrends().then((res) => {
      if (res?.status === 200) {
        setbrends(res?.data?.data);
      }
    });

    getDiscount().then((res) => {
      if (res?.status === 200) {
        setdisCount(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      getSizes(categoryId).then((res) => {
        if (res?.status === 200) {
          setsises(res?.data?.data);
          // if (sizeId !== null) {
          //   if (res?.data?.data?.filter((i) => i.id == sizeId)?.length !== 1) {
          //     form.setFieldsValue({
          //       sizeId: null,
          //     });
          //   }
          // }
        }
      });
    }
  }, [categoryId]);

  return (
    <div className="all_products">
      <div className="row py-3">
        <div className="col-md-3 d-none-md">
          <h6 className="ms-3">SHOES</h6>
          <Collapse onChange={callback} ghost expandIconPosition="right">
            {categories?.map((item, index) => (
              <Panel header={item?.name} key={index + 1} className="p-0">
                <ul className="collapse_list ps-1">
                  <li>
                    <Link to="/">dasdasd</Link>
                  </li>
                  <li>
                    <Link to="/">dasdasd</Link>
                  </li>
                  <li>
                    <Link to="/">dasdasd</Link>
                  </li>
                  <li>
                    <Link to="/">dasdasd</Link>
                  </li>
                </ul>
              </Panel>
            ))}
          </Collapse>
        </div>
        <div className="col-md-9">
          <div className="d-none-md mb-4">
            {/* <FilterDropdown name='Kategoriyalar' data={categories} setCheckedList={setCheckedList} setRefresh={setRefresh} refresh={refresh} /> */}
            <FilterDropdown
              name="Brend"
              data={brends}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
            />
            <FilterDropdown
              name="Chegirma"
              data={disCount}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
            />
            <FilterDropdown
              name="Fasl"
              data={seasons}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
            />
            <FilterDropdown
              name="O'lcham"
              data={sises}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Pagination defaultCurrent={1} total={50} />
          </div>
          <div className="filter_icon">
            <div className="d-flex justify-content-end">
              <button
                onClick={() => setIsModalVisible(true)}
                className="filter-button mt-2"
              >
                Filter <RiArrowUpDownFill />
              </button>
            </div>
          </div>
          <Spin spinning={loading}>
            <div className="row mt-3" style={{ minHeight: "45vh" }}>
              {data?.map((item, index) => (
                <div key={index} className="col-lg-4 col-sm-6 mb-4">
                  <Link to={`/product/${item.id}`}>
                    <Card className="card-filtered-item text-dark">
                      <CardBody className="p-0 pb-2">
                        <img
                          // onMouseOver={() => {setimage_number({num:1, id:index}); console.log("hover")}}
                          // onMouseLeave={() => {setimage_number({num:0, id:index}); console.log("hover")}}
                          className="w-100"
                          src={PATH_API_FILE + item?.photos[image_number.id === index ? image_number.num : 0]}
                          alt=""
                        />
                        <p className="comp-name text-center m-0">
                          {item?.brand?.brnadName}
                        </p>
                        <p className="comp-model text-center m-0">
                          {item?.name}
                        </p>
                        <p className="comp-sale text-center m-0">
                          <span className="through">200</span>{" "}
                          <span className="text-danger ms-2">-20%</span>
                        </p>
                        <p className="comp-price text-center m-0 text-danger">
                          {item?.salePrice}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </div>
      <div id="filter_modal">
        <Modal
          title="Filter"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <button
              className="w-100"
              style={{
                backgroundColor: "var(--dark)",
                color: "#fff",
                border: "0",
                fontSize: "17px",
              }}
            >
              Qidirish
            </button>,
          ]}
        >
          <FilterDropdown />
          <Slider range defaultValue={[20, 50]} />
        </Modal>
      </div>
    </div>
  );
};
export default AllProducts;
