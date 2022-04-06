import React, { useState, useEffect} from "react";
import { List, Avatar, Spin, Empty } from "antd";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";
import { Link } from "react-router-dom";

const Articles = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/article`,
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
    <div className="py-5">
      <h5>Foydali maqolalar</h5>
      <Spin spinning={loading}>
        {
          data?.length === 0 ? <Empty description="Ma'lumot topilmadi" style={{height:"40vh"}} />:
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ borderRadius: "0", width: "60px", height: "60px" }}
                    src={PATH_API_FILE + item?.photo}
                  />
                }
                title={<Link to={`/article-view/${item?.id}`}>{item.title}</Link>}
                description={<p className="articl_length"><p dangerouslySetInnerHTML= {{__html: item?.description}}/></p>}
              />
            </List.Item>
          )}
        />
        }
      </Spin>
    </div>
  );
};
export default Articles;
