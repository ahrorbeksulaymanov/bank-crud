import React, { useEffect, useState } from "react";
import { Button, Empty, message, Popover, Spin, Tooltip, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {AiOutlineEye} from 'react-icons/ai'
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";
const OrderList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState({});
  const [oneProduct, setoneProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [popover, setpopover] = useState({ type: false, id: null });

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/order?expand=product,user`,
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

  const openModal = (itemId) => {
    setIsModalVisible(true)
    const a = data?.filter(i => i?.id === itemId)[0]
    setfilteredData(a)
    const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/product/${a?.product?.id}?expand=brand,size,gender,discount,season,category,color`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        if (res?.status === 200) {
          setoneProduct(res?.data?.data);
        }
      });
  }

  const deleteData = (id) => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/order/${id}`,
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
          <h5>Buyurtmalar</h5>
        </div>
        <hr />
        <div className="table-body">
          <table className="table">
            <thead className="bg-table-header">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Product name</th>
                <th scope="col">Customer name</th>
                <th scope="col">Tel number</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">status</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => (
                  <tr key={index} className="table-body-padding">
                    <td>{index + 1}</td>
                    <td>{item?.product?.name}</td>
                    <td>{item?.user?.firstName}</td>
                    <td>{item?.user?.phoneNumber}</td>
                    <td>{item?.product?.salePrice}</td>
                    <td>
                      {(item?.product?.createdAt).slice(0, 10) +
                        " " +
                        (item?.product?.createdAt).slice(11, 16)}
                    </td>
                    <td>
                      {item?.active ? (
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
                        <Tooltip
                          color={"primary"}
                          placement="top"
                          title={"This is a view button"}
                        >
                          <AiOutlineEye onClick={() => openModal(item?.id)} style={{fontSize:"17px"}} className="text-success pointer me-3"
                            />
                        </Tooltip>
                        <Tooltip
                          color={"red"}
                          placement="top"
                          title={"This is a delete button"}
                        >
                          <Popover
                            visible={popover.type && popover?.id == item?.id}
                            placement="left"
                            title={"Ma'lumotni o'chirmoqchimisiz?"}
                            content={
                              <div className="d-flex justify-content-end">
                                <Button
                                  className="d-flex justify-content-between align-items-center me-2"
                                  type=""
                                  onClick={() =>
                                    setpopover({ type: false, id: item?.id })
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="d-flex justify-content-between align-items-center"
                                  type="primary"
                                  onClick={() => deleteData(item?.id)}
                                >
                                  Ok
                                </Button>
                              </div>
                            }
                            trigger="click"
                          >
                            <DeleteOutlined
                              onClick={() =>
                                setpopover({ type: true, id: item?.id })
                              }
                              className="text-danger pointer"
                            />
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

      <Modal title="Buyurtma" width={1000} visible={isModalVisible} footer={[<button onClick={() => setIsModalVisible(false)} className="btn btn-light">Yopish</button>]} onCancel={() => setIsModalVisible(false)}>
        {oneProduct  && 
        <div className="row">
            <div className="col-sm-6">
                <p><span className="text-secondary fw-bolder me-2">Tovar nomi:</span>{filteredData?.product?.name}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar narxi:</span>{filteredData?.product?.price}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar sotilish narxi:</span>{filteredData?.product?.salePrice}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar brendi:</span>{oneProduct?.brand?.brnadName}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar categoriyasi:</span>{oneProduct?.category?.name}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar chegirmasi:</span>{oneProduct?.discount?.percent}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar turi:</span>{oneProduct?.gender?.name}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar fasli:</span>{oneProduct?.season?.name}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar o'lchami:</span>{filteredData?.size}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar rangi:</span>{filteredData?.color}</p>
            </div>
            <div className="col-sm-6">
                <p><span className="text-secondary fw-bolder me-2">Klient:</span>{filteredData?.user?.firstName}</p>
                <p><span className="text-secondary fw-bolder me-2">Klient nomeri:</span>{filteredData?.user?.phoneNumber}</p>
                <p><span className="text-secondary fw-bolder me-2">Klient habari:</span>{filteredData?.description}</p>
                <p><span className="text-secondary fw-bolder me-2">Tovar soni:</span>{filteredData?.count}</p>
                <img src={PATH_API_FILE + (oneProduct?.photos?.length > 0 && oneProduct?.photos[0])} className='w-100' alt="" />
            </div>
        </div>
        }
      </Modal>
    </Spin>
  );
};
export default OrderList;
