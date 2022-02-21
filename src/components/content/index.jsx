import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  Button,
  Empty,
  message,
  Pagination,
  Popover,
  Spin,
  Tooltip,
} from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import { PATH_API } from "../../constants";
import useDebounce from "../../debounce";
import { Link } from "react-router-dom";

const { Search } = Input;

const BankList = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [showCount, setShowCount] = useState(10);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState({
    type:"",
    id: true,
    code: true,
    name: true,
  });
  const [refresh, setRefresh] = useState(false);

  const debounce = useDebounce(searchVal, 1500);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/Bank/GetList`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        PageNumber: page,
        PageLimit: showCount,
        Search: searchVal,
        SortColumn: sortOrder.type,
        OrderType: sortOrder[sortOrder.type] ? "asc" : "desc",
      },
    }).then((res) => {
      setData(res?.data?.rows);
      setTotal(res?.data?.total);
      setLoading(false);
    });
  }, [page, showCount, debounce, sortOrder, refresh, sortOrder]);

  const deleteData = (id) => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/Bank/Delete?id=${id}`,
      method: "Delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        message.success("Data is deleted!");
        setRefresh(!refresh);
      })
      .catch((err) => {
        message.error("Something is wrong!");
      });
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Bank</h5>
          <Button
            className="d-flex justify-content-between align-items-center"
            type="primary"
          >
            <HomeOutlined className="me-1" />
            Home
          </Button>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="search-input">
            <Search
              placeholder="input search text"
              onChange={(e) => setSearchVal(e.target.value)}
              enterButton
            />
          </div>
          <Link to="/admin/bank/0">
            <Button type="primary">+ Add</Button>
          </Link>
        </div>
        <table className="table mb-0">
          <thead className="bg-table-header">
            <tr>
              <th scope="col" className="p-0" style={{ width: "8%" }}>
                <div
                  className="data-table-header d-flex justify-content-start align-items-center"
                  onClick={() =>
                    setSortOrder({
                      type:"id",
                      id: !sortOrder.id,
                      code: sortOrder.code,
                      name: sortOrder.name,
                    })
                  }
                >
                  id{" "}
                  <div className="d-flex flex-column bd-highlight ms-1">
                    <CaretUpOutlined />
                    <CaretDownOutlined />
                  </div>
                </div>
              </th>
              <th scope="col" className="p-0" style={{ width: "10%" }}>
                <div
                  className="data-table-header d-flex justify-content-start align-items-center"
                  onClick={() =>
                    setSortOrder({
                      type:"code",
                      id: sortOrder.id,
                      code: !sortOrder.code,
                      name: sortOrder.name,
                    })
                  }
                >
                  code{" "}
                  <div className="d-flex flex-column bd-highlight ms-1">
                    <CaretUpOutlined />
                    <CaretDownOutlined />
                  </div>
                </div>
              </th>
              <th scope="col" className="p-0" style={{ width: "60%" }}>
                <div
                  className="data-table-header d-flex justify-content-start align-items-center"
                  onClick={() =>
                    setSortOrder({
                      type:"name",
                      id: sortOrder.id,
                      code: sortOrder.code,
                      name: !sortOrder.name,
                    })
                  }
                >
                  name{" "}
                  <div className="d-flex flex-column bd-highlight ms-1">
                    <CaretUpOutlined />
                    <CaretDownOutlined />
                  </div>
                </div>
              </th>
              <th scope="col" style={{ padding: "16px", width: "10%" }}>
                status
              </th>
              <th scope="col" style={{ padding: "16px" }}>
                action
              </th>
            </tr>
          </thead>
        </table>
        <div className="table-body">
          <table className="table">
            <tbody>
              {data?.map((item, index) => (
                <tr key={index} className="table-body-padding">
                  <td style={{ width: "8%" }}>
                    <div>{item?.id}</div>
                  </td>
                  <td style={{ width: "10%" }}>
                    <div>{item?.code}</div>
                  </td>
                  <td style={{ width: "60%" }}>
                    <div>{item?.name}</div>
                  </td>
                  <td style={{ width: "10%" }}>
                    <div>
                      <button>{item.status}</button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <Link to={`/admin/bank/${item.id}`}>
                        <Tooltip
                          color={"lime"}
                          placement="top"
                          title={"This is a edit button"}
                        >
                          <EditOutlined className="text-success me-3 pointer" />
                        </Tooltip>
                      </Link>
                      <Tooltip
                        color={"red"}
                        placement="top"
                        title={"This is a delete button"}
                      >
                        <Popover
                          placement="left"
                          title={"Ma'lumotni o'chirmoqchimisiz?"}
                          content={
                            <div className="d-flex justify-content-end">
                              <Button
                                className="d-flex justify-content-between align-items-center me-2"
                                type=""
                              >
                                Cancel
                              </Button>
                              <Button
                                className="d-flex justify-content-between align-items-center"
                                type="primary"
                                onClick={() => deleteData(item.id)}
                              >
                                Ok
                              </Button>
                            </div>
                          }
                          trigger="click"
                        >
                          <DeleteOutlined className="text-danger pointer" />
                        </Popover>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && <Empty />}
        <div className="text-end mt-2">
          <Pagination
            total={total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            defaultPageSize={showCount || 10}
            onChange={(page, showCount) => {
              setShowCount(showCount);
              setPage(page);
            }}
            current={page}
          />
        </div>
      </div>
    </Spin>
  );
};
export default BankList;
