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
  DeleteOutlined
} from "@ant-design/icons";
import axios from "axios";
import { PATH_API } from "../../constants";

const ContactList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(false);
  const [popover, setpopover] = useState({type:false, id:null});

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/contact?expand=user`,
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
      url: PATH_API + `/contact/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        message.success("Data is deleted!");
        setRefresh(!refresh);
        setpopover({type:false, id:null})
      })
      .catch((err) => {
        message.error("Something is wrong!");
      });
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Kontaktlar</h5>
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
                  Full name
                </th>
                <th scope="col">
                  Phone number
                </th>
                <th scope="col">
                  Description
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
                  <td>{item?.user?.firstName}</td>
                  <td>{item?.user?.phoneNumber}</td>
                  <td>{item?.description}</td>
                  <td>
                    <div>
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
                                onClick={() => setpopover({type:false, id:item.id})}
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
                          <DeleteOutlined onClick={() => setpopover({type:true, id:item.id})} className="text-danger pointer" />
                        </Popover>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(data?.length === 0 || data === null) && <Empty />}
      </div>
    </Spin>
  );
};
export default ContactList;
