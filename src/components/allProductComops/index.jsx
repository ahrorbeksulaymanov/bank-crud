import React, { useEffect, useState } from "react";
import { Collapse, Pagination, Modal, Spin, Empty } from "antd";
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
  getColor,
  getDiscount,
  getSeasons,
  getSizes,
} from "../../functions";
import PriceDropdown from "./priceDropdown";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
const { Panel } = Collapse;

const AllProducts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [total, settotal] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(12);
  const [data, setData] = useState([]);
  const [categories, setcategories] = useState([]);
  const [seasons, setseasons] = useState([]);
  const [brends, setbrends] = useState([]);
  const [sises, setsises] = useState([]);
  const [disCount, setdisCount] = useState([]);
  const [colors, setcolors] = useState([]);
  const [categoryId, setcategoryId] = useState(null);
  const [width, setWidth] = useState(0);
  const [checkedList, setCheckedList] = useState({
    brandId: [],
    discountId: [],
    seasonId: [],
    sizeId: [],
    categoryId: [],
    colorId: [],
    saleFrom: '',
    saleTo: '',
  });

  function categoryChange(key) {
    setcategoryId(key);
    setCheckedList({
      brandId: checkedList.brandId,
      discountId: checkedList.discountId,
      seasonId: checkedList.seasonId,
      sizeId: checkedList.sizeId,
      categoryId: [key],
      colorId: checkedList.colorId,
      saleFrom: checkedList?.saleFrom,
      saleTo: checkedList?.saleTo,
    });
    setRefresh(!refresh);
  }
  const searchVal = useSelector((state) => state?.product);

  useEffect(() => {
    setLoading(true);
    const json = {};
    Object.keys(checkedList).map((key, index) => {
      json[key] = String(checkedList[key]);
    });
    json.search = String(searchVal?.search_val);
    json.genderId = String(searchVal?.gender_val);
    axios({
      url:
        PATH_API +
        `/product?expand=discount&filter=${JSON.stringify(json).slice(
          1,
          -1
        )}&order=updated_at~desc`,
      method: "GET",
      params: {
        pageSize: pageSize,
        size: pageSize,
        page: currentPage,
      },
    }).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data);
        settotal(res?.data?.meta?.totalElement);
        setLoading(false);
      }
    });
  }, [refresh, currentPage, pageSize, searchVal]);

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

    getColor().then((res) => {
      if (res?.status === 200) {
        setcolors(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      getSizes(categoryId).then((res) => {
        if (res?.status === 200) {
          setsises(res?.data?.data);
        }
      });
    }
  }, [categoryId]);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const fetchMoreData = (e) => {
    if(width < 768) {
      setpageSize(pageSize + 10);
    }
  };

  return (
    <div className="all_products">
      <div className="row py-3">
        <div className="col-md-3 d-none-md">
          <h6 className="ms-3 mb-4">Kategoriyalar</h6>
          <Collapse ghost expandIconPosition="right">
            {categories?.map((item, index) =>
              item?.children?.length > 0 ? (
                <Panel header={item?.name} key={item?.id} className="p-0">
                  <ul className="collapse_list ps-1">
                    {item?.children &&
                      item?.children?.map((i, index) => (
                        <li
                          key={index}
                          className={`pointer ${
                            checkedList.categoryId?.includes(i?.id) && "fw-bold"
                          }`}
                          onClick={() => categoryChange(i?.id)}
                        >
                          {i?.name}
                        </li>
                      ))}
                  </ul>
                </Panel>
              ) : (
                <p
                  style={{ marginLeft: "16px" }}
                  onClick={() => categoryChange(item?.id)}
                  className={`pointer ${
                    checkedList.categoryId?.includes(item?.id) && "fw-bold"
                  }`}
                >
                  {item?.name}
                </p>
              )
            )}
          </Collapse>
        </div>
        <div className="col-md-9">
          <div className="d-none-md mb-4">
            <FilterDropdown
              name="Brend"
              type="brend"
              data={brends}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={false}
            />
            <FilterDropdown
              name="Chegirma"
              type="discount"
              data={disCount}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={false}
            />
            <FilterDropdown
              name="Fasl"
              type="season"
              data={seasons}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={false}
            />
            <FilterDropdown
              name="Rang"
              type="color"
              data={colors}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={false}
            />
            {categoryId && (
              <FilterDropdown
                name="O'lcham"
                type="size"
                data={sises}
                setCheckedList={setCheckedList}
                checkedList={checkedList}
                setRefresh={setRefresh}
                refresh={refresh}
                isMobile={false}
              />
            )}
            <PriceDropdown
              name="Narxi"
              type="price"
              data={[]}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={false}
            />
          </div>
          <div className="pagination_wrapper">
            {data?.length !== 0 && (
              <Pagination
                pageSize={pageSize}
                current={currentPage}
                total={total}
                onChange={(page, pageSize) => {
                  setcurrentPage(page);
                  setpageSize(pageSize);
                }}
              />
            )}
          </div>
          <div className="filter_icon">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-secondary text-bold m-0">{total}</p>
              <button
                onClick={() => setIsModalVisible(true)}
                className="filter-button mt-0"
              >
                Filter <RiArrowUpDownFill />
              </button>
            </div>
          </div>
          <Spin spinning={loading}>
            <InfiniteScroll
              dataLength={data?.length}
              next={fetchMoreData}
              hasMore={true}
              style={{overflowX:"hidden"}}
            >
              <div className="row mt-3" style={{ minHeight: "45vh" }}>
                {data?.length === 0 && (
                  <Empty description="Ma'lumot topilmadi" />
                )}
                {data?.slice(0, 3)?.map((item, index) => (
                  <div key={index} className="col-lg-4 col-sm-6 mb-4">
                    <Link to={`/product/${item.id}`}>
                      <Card className="card-filtered-item text-dark">
                        <CardBody className="p-0 pb-2">
                          <img
                            className="w-100"
                            src={PATH_API_FILE + item?.photos[0]}
                            alt=""
                          />
                          <p className="comp-name text-center m-0">
                            {item?.brand?.brnadName}
                          </p>
                          <p className="comp-model text-center m-0">
                            {item?.name}
                          </p>
                          {item?.discount ? (
                            <>
                              <p className="comp-sale text-center m-0">
                                <span className="through">
                                  {item?.salePrice}
                                </span>{" "}
                                <span className="text-danger ms-2">
                                  -{item?.discount?.percent}%
                                </span>
                              </p>
                              <p className="comp-price text-center m-0 text-danger">
                                {(
                                  item?.salePrice -
                                  item?.salePrice *
                                    (item?.discount?.percent / 100)
                                ).toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="comp-price text-center m-0 text-danger mb-4">
                              {item?.salePrice}
                            </p>
                          )}
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                ))}
                 {data?.map((item, index) => (
                  <div key={index} className="col-lg-4 col-sm-6 mb-4">
                    <Link to={`/product/${item.id}`}>
                      <Card className="card-filtered-item text-dark">
                        <CardBody className="p-0 pb-2">
                          <img
                            className="w-100"
                            src={PATH_API_FILE + item?.photos[0]}
                            alt=""
                          />
                          <p className="comp-name text-center m-0">
                            {item?.brand?.brnadName}
                          </p>
                          <p className="comp-model text-center m-0">
                            {item?.name}
                          </p>
                          {item?.discount ? (
                            <>
                              <p className="comp-sale text-center m-0">
                                <span className="through">
                                  {item?.salePrice}
                                </span>{" "}
                                <span className="text-danger ms-2">
                                  -{item?.discount?.percent}%
                                </span>
                              </p>
                              <p className="comp-price text-center m-0 text-danger">
                                {(
                                  item?.salePrice -
                                  item?.salePrice *
                                    (item?.discount?.percent / 100)
                                ).toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="comp-price text-center m-0 text-danger mb-4">
                              {item?.salePrice}
                            </p>
                          )}
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </Spin>
        </div>
      </div>
      <div id="filter_modal">
        <Modal
          title="Filter"
          visible={isModalVisible}
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
              onClick={() => {
                setRefresh(!refresh);
                setIsModalVisible(false);
              }}
            >
              Qidirish
            </button>,
          ]}
        >
          <Collapse
            onChange={categoryChange}
            bordered={false}
            expandIconPosition="right"
          >
            {categories?.map((item, index) =>
              item?.children?.length > 0 ? (
                <Panel header={item?.name} key={item?.id} className="p-0">
                  <ul className="collapse_list ps-1">
                    {item?.children &&
                      item?.children?.map((i, index) => (
                        <li
                          key={index}
                          className={`pointer ${
                            checkedList.categoryId?.includes(i?.id) && "fw-bold"
                          }`}
                          onClick={() => categoryChange(i?.id)}
                        >
                          {i?.name}
                        </li>
                      ))}
                  </ul>
                </Panel>
              ) : (
                <p
                  style={{ marginLeft: "16px" }}
                  onClick={() => categoryChange(item?.id)}
                  className={`pointer ${
                    checkedList.categoryId?.includes(item?.id) && "fw-bold"
                  }`}
                >
                  {item?.name}
                </p>
              )
            )}
          </Collapse>
          <div className="my-5">
            <FilterDropdown
              name="Brend"
              type="brend"
              data={brends}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={true}
            />
            <FilterDropdown
              name="Chegirma"
              type="discount"
              data={disCount}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={true}
            />
            <FilterDropdown
              name="Fasl"
              type="season"
              data={seasons}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={true}
            />
            <FilterDropdown
              name="Rang"
              type="color"
              data={colors}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={true}
            />
            {categoryId && 
            <FilterDropdown
              name="O'lcham"
              type="size"
              data={sises}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={true}
            />
            }
            <PriceDropdown
              name="Narxi"
              type="price"
              data={[]}
              setCheckedList={setCheckedList}
              checkedList={checkedList}
              setRefresh={setRefresh}
              refresh={refresh}
              isMobile={true}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default AllProducts;
