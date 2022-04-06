import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";
import { useRouteMatch } from "react-router-dom";
import { Spin } from "antd";
const ArticleView = () => {
    const history = useHistory();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const match = useRouteMatch("/article-view/:id")
  
    useEffect(() => {
      setLoading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/article/${match.params.id}`,
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
      <div className="conpany-page pb-5 pt-4">
        <Spin spinning={loading}>
          <p className="d-flex justify-content-between align-items-center fw-600 mt-4">
            <div
              onClick={() => history.goBack()}
              className="d-flex align-items-center fw-600 back-button pointer"
            >
              <IoIosArrowBack /> Back
            </div>
            <h4 className="conpany_header_name">{data?.title}</h4>
            <div></div>
          </p>
            <div className="row">
                <div className="col-sm-3">
                    <img src={PATH_API_FILE + data?.photo}  className='w-100 mb-5' alt="" />
                </div>
                <div className="col-sm-9">
                    <div dangerouslySetInnerHTML= {{__html: data?.description}}/>
                </div>
            </div>
        </Spin>
      </div>
    );
};
export default ArticleView;
