import React, { useState , useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./style.scss";
import product2 from "../../assets/images/main-r1.jpg";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { PATH_API } from "../../constants";
import { Spin } from "antd";

const CompanyPage = (props) => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const match = useRouteMatch("/company/:id")

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/brand/feature/${match.params.id}`,
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
  }, []);

  return (
    <div className="conpany-page">
      <Spin spinning={loading}>
            <p className="d-flex justify-content-between align-items-center fw-600 mt-4">
              <div
                onClick={() => history.goBack()}
                className="d-flex align-items-center fw-600 back-button pointer"
              >
                <IoIosArrowBack /> Back
              </div>
              <h4 className="conpany_header_name">{props.location?.brand?.name}</h4>
              <div></div>
            </p>
            <div className="row">
              <div className="col-md-5">
                  <img src={product2} className='w-100 mb-5' alt="" />
              </div>
              <div className="col-md-7">
                {data?.map((item, index) => (
                  <p><span className="me-2 fw-bold">{item?.name}</span>{item?.description}</p>
                ))}
              </div>
          </div>
      </Spin>
    </div>
  );
};
export default CompanyPage;
