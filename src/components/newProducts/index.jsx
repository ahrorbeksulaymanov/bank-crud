import React from "react";
import mainLeftImg from "../../assets/images/main-left.jpg";
import mainRight1Img from "../../assets/images/main-r1.jpg";
import mainRight2Img from "../../assets/images/main-r2.jpg";
import "./style.scss";
import SliderNews from "./slider";

const NewProducts = () => {
  return (
    <div className="py-5">
      <div className="row">
        <div className="col-md-6">
          <div className="image-sale left-main-img mb-4">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainLeftImg} alt="" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="image-sale right-main-img mb-4">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
          <div className="image-sale right-main-img">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight2Img} alt="" />
          </div>
        </div>
      </div>
      <SliderNews />
      <h4 className=" mb-4">Yangi toplam</h4>
      <div className="row">
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="image-sale-smaller hover-effect">
            <div>
              <p>Lorem, ipsum dolor.</p>
              <h5>Lorem ipsum dolor sit.</h5>
            </div>
            <img className="w-100" src={mainRight1Img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewProducts;
