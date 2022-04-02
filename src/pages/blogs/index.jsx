import React, {useState} from "react";
import aboutImg from "../../assets/images/about-img.jpg";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Blogs = () => {

  const [data, setData] = useState([1,2,3,4,5]);

  return (
    <div className="py-5">
      <img src={aboutImg} className="about-us-img" alt="" />
      <h5 className="mb-0 mt-4">Bloglar</h5>
      <Row gutter={[24,24]} className="pt-4">
      {
        data?.length && data?.map((e,i) => (
          <Col sm={12} lg={6} md={8} xl={6} key={i} onClick={() => {}} >
          <Link to='/blogs-view/:id'>
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
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
