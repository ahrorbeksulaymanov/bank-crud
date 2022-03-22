import React, { useState } from "react";
import { Collapse, Pagination, Modal, Slider } from "antd";
import "./style.scss";
import FilterDropdown from "./filterDropdown";
import { Card, CardBody } from "reactstrap";
import Krasofka from "../../assets/images/krasofka.jpg";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

const AllProducts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="all_products">
      <div className="row py-3">
        <div className="col-md-3 d-none-md">
          <h6 className="ms-3">SHOES</h6>
          <Collapse onChange={callback} ghost expandIconPosition="right">
            <Panel header="Bathing shoes" key="1">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores nisi, ut vero quo iure quos libero ducimus quam quas
                ab dolor quibusdam velit doloremque eos natus dolorem similique
                error voluptas.
              </p>
            </Panel>
            <Panel header="Boots" key="2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores nisi, ut vero quo iure quos libero ducimus quam quas
                ab dolor quibusdam velit doloremque eos natus dolorem similique
                error voluptas.
              </p>
            </Panel>
            <Panel header="Custom shoes" key="3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores nisi, ut vero quo iure quos libero ducimus quam quas
                ab dolor quibusdam velit doloremque eos natus dolorem similique
                error voluptas.
              </p>
            </Panel>
            <Panel header="Lase-ups" key="4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores nisi, ut vero quo iure quos libero ducimus quam quas
                ab dolor quibusdam velit doloremque eos natus dolorem similique
                error voluptas.
              </p>
            </Panel>
            <Panel header="Lined" key="5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores nisi, ut vero quo iure quos libero ducimus quam quas
                ab dolor quibusdam velit doloremque eos natus dolorem similique
                error voluptas.
              </p>
            </Panel>
          </Collapse>
        </div>
        <div className="col-md-9">
          <div className="d-none-md mb-4">
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
          </div>
          <div className="d-flex justify-content-end">
            <Pagination defaultCurrent={1} total={50} />
          </div>
          <div className="filter_icon">
            <div className="d-flex justify-content-end">
                <button onClick={() => setIsModalVisible(true)} className="filter-button mt-2">
                Filter <RiArrowUpDownFill />
                </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4 col-sm-6 mb-4">
              <Link to='/product/:id'>
                <Card className="card-filtered-item text-dark">
                  <CardBody>
                    <img className="w-100" src={Krasofka} alt="" />
                    <p className="comp-name text-center m-0">oamk</p>
                    <p className="comp-model text-center m-0">
                      Sneakers - AO36030A
                    </p>
                    <p className="comp-sale text-center m-0">
                      <span className="through">200</span>{" "}
                      <span className="text-danger ms-2">-20%</span>
                    </p>
                    <p className="comp-price text-center m-0 text-danger">150</p>
                  </CardBody>
                </Card>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <Link to='/product/:id'>
                <Card className="card-filtered-item text-dark">
                  <CardBody>
                    <img className="w-100" src={Krasofka} alt="" />
                    <p className="comp-name text-center m-0">oamk</p>
                    <p className="comp-model text-center m-0">
                      Sneakers - AO36030A
                    </p>
                    <p className="comp-sale text-center m-0">
                      <span className="through">200</span>{" "}
                      <span className="text-danger ms-2">-20%</span>
                    </p>
                    <p className="comp-price text-center m-0 text-danger">150</p>
                  </CardBody>
                </Card>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <Link to='/product/:id'>
                <Card className="card-filtered-item text-dark">
                  <CardBody>
                    <img className="w-100" src={Krasofka} alt="" />
                    <p className="comp-name text-center m-0">oamk</p>
                    <p className="comp-model text-center m-0">
                      Sneakers - AO36030A
                    </p>
                    <p className="comp-sale text-center m-0">
                      <span className="through">200</span>{" "}
                      <span className="text-danger ms-2">-20%</span>
                    </p>
                    <p className="comp-price text-center m-0 text-danger">150</p>
                  </CardBody>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="filter_modal">
        <Modal
            title="Filter"
            visible={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
            footer={[<button className="w-100" style={{backgroundColor:"var(--dark)", color:"#fff", border:"0", fontSize:"17px"}}>Qidirish</button>]}
        >
            <FilterDropdown />
            <Slider onChange={(e) => console.log(e)} range defaultValue={[20, 50]} />
        </Modal>
      </div>
    </div>
  );
};
export default AllProducts;
