import React from "react";
import aboutImg from "../../assets/images/about-img.jpg";
import { Card } from "antd";

const { Meta } = Card;

const Blogs = () => {
  return (
    <div className="py-5">
      <img src={aboutImg} className="about-us-img" alt="" />
      <div className="row pt-4">
      <h5>Bloglar</h5>
        <div className="col-md-3">
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
        </div>
        <div className="col-md-3">
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
        </div>
        <div className="col-md-3">
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
        </div>
        <div className="col-md-3">
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
        </div>
        <div className="col-md-3">
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
        </div>
        <div className="col-md-3">
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
        </div>
      </div>
    </div>
  );
};
export default Blogs;
