import React, { useState } from "react";
import product2 from "../../assets/images/product2.jpg";
import { IoIosArrowBack } from "react-icons/io";
import "./style.scss";
import { Select, Collapse } from "antd";
import SubmitData from "./submitDataModal";
import SliderSimiliar from "./sliderSimiliar";
const { Panel } = Collapse;
const { Option } = Select;

const ItemShow = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="show-items pt-4">
      <div className="row">
        <div className="col-md-7">
          <p className="d-flex align-items-center fw-600 back-button">
            <IoIosArrowBack />
            Back
          </p>
          <img src={product2} className="w-100" alt="" />
        </div>
        <div className="col-md-1">
          <img src={product2} className="w-100 mb-4 litle-img" alt="" />
          <img src={product2} className="w-100 mb-4 litle-img" alt="" />
          <img src={product2} className="w-100 mb-4 litle-img" alt="" />
          <img src={product2} className="w-100 mb-4 litle-img" alt="" />
        </div>
        <div className="col-md-4">
          <h3 className="m-0">OAMC</h3>
          <p className="m-0">Sneakers - AO36030A</p>
          <p className="">Colour ellow</p>
          <p className="comp-sale mb-1">
            <span className="through">200</span>{" "}
            <span className="text-danger ms-2">-20%</span>
          </p>
          <p className="comp-price m-0 text-danger">150</p>
          <p className="text-secondary">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam ex
            perferendis id.
          </p>
          <p className="text-secondary">Item number 23513216 - 465</p>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <p className="m-0 text-secondary">Size</p>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div>
              <p className="m-0 text-secondary">Amount</p>
              <Select
                defaultValue="lucy"
                style={{ width: 100 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </div>
          <button
            className="offer-button"
            onClick={() => setIsModalVisible(true)}
          >
            Buyurtma berish
          </button>
          <p className="text-secondary">More colours</p>
          <img
            src={product2}
            className="me-4"
            style={{ width: "80px" }}
            alt=""
          />
          <img src={product2} className="" style={{ width: "80px" }} alt="" />
          <Collapse
            bordered={false}
            style={{ backgroundColor: "transparent" }}
            expandIconPosition="right"
          >
            <Panel header="This is panel header 1" key="1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              maxime sit atque dignissimos libero. Sunt facere assumenda atque
              iste voluptas laborum est maxime, aut, porro sed consectetur,
              veritatis tempora accusamus.
            </Panel>
            <Panel header="This is panel header 2" key="2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              maxime sit atque dignissimos libero. Sunt facere assumenda atque
              iste voluptas laborum est maxime, aut, porro sed consectetur,
              veritatis tempora accusamus.
            </Panel>
            <Panel header="This is panel header 3" key="3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              maxime sit atque dignissimos libero. Sunt facere assumenda atque
              iste voluptas laborum est maxime, aut, porro sed consectetur,
              veritatis tempora accusamus.
            </Panel>
          </Collapse>
        </div>
      </div>
      <SubmitData isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <SliderSimiliar />
    </div>
  );
};
export default ItemShow;
