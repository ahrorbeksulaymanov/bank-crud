import React, { useEffect, useState } from "react";
import {
  Button,
  Empty,
  message,
  Pagination,
  Popover,
  Spin,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { VscNotebook } from "react-icons/vsc";
import axios from "axios";
import { Link } from "react-router-dom";
import { PATH_API } from "../../constants";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, settotal] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [popover, setpopover] = useState({ type: false, id: null });

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/product`,
      method: "GET",
      params: {
        pageSize: pageSize,
        size: pageSize,
        page: currentPage,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data);
        settotal(res?.data?.meta?.totalElement);
        setLoading(false);
      }
    });
  }, [refresh, pageSize, currentPage]);

  const deleteData = (id) => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/product/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        message.success("Data is deleted!");
        setRefresh(!refresh);
        setpopover({ type: false, id: null });
      })
      .catch((err) => {
        message.error("Something is wrong!");
      });
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Product</h5>
          <Link to="/product-add/0">
            <Button type="primary">+ Qo'shish</Button>
          </Link>
        </div>
        <hr />
        <div className="table-body">
          <table className="table">
            <thead className="bg-table-header">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">status</th>
                <th scope="col">action</th>
                <th scope="col">Features</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => (
                  <tr key={index} className="table-body-padding">
                    <td>{pageSize * currentPage + index + 1 - 10}</td>
                    <td>{item?.name}</td>
                    <td>{item?.shortDescription.slice(0, 50)}...</td>
                    <td>
                      {item.active ? (
                        <span className="badge rounded-pill bg-success">
                          Active
                        </span>
                      ) : (
                        <span className="badge rounded-pill bg-danger">
                          InActive
                        </span>
                      )}
                    </td>
                    <td>
                      <div>
                        <Link to={`/product-add/${item.id}`}>
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
                            visible={popover.type && popover?.id == item.id}
                            placement="left"
                            title={"Ma'lumotni o'chirmoqchimisiz?"}
                            content={
                              <div className="d-flex justify-content-end">
                                <Button
                                  className="d-flex justify-content-between align-items-center me-2"
                                  type=""
                                  onClick={() =>
                                    setpopover({ type: false, id: item.id })
                                  }
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
                            <DeleteOutlined
                              onClick={() =>
                                setpopover({ type: true, id: item.id })
                              }
                              className="text-danger pointer"
                            />
                          </Popover>
                        </Tooltip>
                      </div>
                    </td>
                    <td>
                      <Link to={`/product/features/${item.id}`}>
                        <Tooltip
                          color={"lime"}
                          placement="top"
                          title={"This is a feature button"}
                        >
                          <VscNotebook className="text-success me-3 pointer" />
                        </Tooltip>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
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
        </div>
        {(data?.length === 0 || data === null) && <Empty />}
      </div>
    </Spin>
  );
};
export default ProductList;
