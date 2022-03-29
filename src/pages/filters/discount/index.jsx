import React, { useEffect, useState } from "react";
import {
  Button,
  Empty,
  message,
  Popover,
  Spin,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { PATH_API } from "../../../constants";

const DiscountList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/discount`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data);
        setLoading(false);
      }
    });
  }, [refresh]);

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
          <h5>Skidkalar</h5>
          <Link to="/discount-add/0">
            <Button type="primary">+ Qo'shish</Button>
          </Link>
        </div>
        <hr />
        <div className="table-body">
          <table className="table">
            <thead className="bg-table-header">
              <tr>
                <th scope="col">
                  No
                </th>
                <th scope="col">
                  Fullname
                </th>
                <th scope="col">
                  Tel nomer
                </th>
                <th scope="col">
                  Roli
                </th>
                <th scope="col">
                  status
                </th>
                <th scope="col">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data?.map((item, index) => (
                <tr key={index} className="table-body-padding">
                  <td>{index+1}</td>
                  <td>{item?.firstName + " " + item?.lastName}</td>
                  <td>{item?.phoneNumber}</td>
                  <td>{item?.roles[0]?.roleName}</td>
                  <td>{item.active ? <span className="badge rounded-pill bg-success">Active</span> : <span className="badge rounded-pill bg-danger">InActive</span>}</td>
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
        {data?.length === 0 || data === null && <Empty />}
      </div>
    </Spin>
  );
};
export default DiscountList;
