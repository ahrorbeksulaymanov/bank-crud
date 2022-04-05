import React, {useState, useEffect} from "react";
import aboutImg from "../../assets/images/about-img.jpg";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { PATH_API, PATH_API_FILE } from "../../constants";

const { Meta } = Card;

const Blogs = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/blog`,
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
      <img src={aboutImg} className="about-us-img" alt="" />
      <h5 className="mb-0 mt-4">Bloglar</h5>
      <Row gutter={[24,24]} className="pt-4">
      {
        data?.length && data?.map((item,index) => (
          <Col sm={12} lg={6} md={8} xl={6} key={index} onClick={() => {}} >
          <Link to={`/blogs-view/${item?.id}`}>
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <img
                alt="example"
                src={PATH_API_FILE + item?.photo}
              />
            }
          >
            <Meta title={item?.title} description={`${(item?.description).slice(0, 30)} ...`} />
          </Card>
          </Link>
        </Col>
        ))
      }
      </Row>
    </div>
  );
};
export default Blogs;
