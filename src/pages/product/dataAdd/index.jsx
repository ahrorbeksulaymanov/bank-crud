import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  Switch,
  Select,
} from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API } from "../../../constants";
import PicturesWall from "./dataUpload";
import { getBrends, getCategories, getDiscount, getGenders, getSeasons, getSizes } from "./functions";
const { Option } = Select;

const AddProduct = () => {
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(true);
  const [categories, setcategories] = useState([]);
  const [seasons, setseasons] = useState([]);
  const [genders, setgenders] = useState([]);
  const [brends, setbrends] = useState([]);
  const [sises, setsises] = useState([]);
  const [disCount, setdisCount] = useState([]);
  const [images, setimages] = useState([]);
  const [categoryId, setcategoryId] = useState(null);
  const match = useRouteMatch("/product-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (match.params.id != 0) {
      setloading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/product/${match.params.id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        // form.setFieldsValue({
        //   code: res?.data?.Code,
        //   bankname: res?.data?.Bankname,
        //   stateid: Number(res?.data?.Stateid),
        // });
        setloading(false);
      });
    }
  }, []);

  useEffect(() => {
    getCategories().then((res) => {
      if(res?.status === 200){
        setcategories(res?.data?.data);
      }
    })

    getSeasons().then((res) => {
      if(res?.status === 200){
        setseasons(res?.data?.data);
      }
    })

    getGenders().then((res) => {
      if(res?.status === 200){
        setgenders(res?.data?.data);
      }
    })

    getBrends().then((res) => {
      if(res?.status === 200){
        setbrends(res?.data?.data);
      }
    })

    getDiscount().then((res) => {
      if(res?.status === 200){
        setdisCount(res?.data?.data);
      }
    })

  }, [])

  useEffect(() => {
    if(categoryId !== null){
      getSizes(categoryId).then((res) => {
        if(res?.status === 200){
          setsises(res?.data?.data);
        }
      })
    }
  }, [categoryId])

  console.log("images=>", images);

  const updateData = (val) => {

    const formdata = new FormData();
    // const { images }
    console.log('imagesss', images);
    for (let i = 0; i < images?.length; i++) {
      formdata.append(`photos`, images[i]?.originFileObj)
    }
    console.log("Dddd", val);
    val.active = checked;
    Object.keys(val).map(key => {
      formdata.append(key, val[key])
    });
    
    const token = localStorage.getItem("token");
    if(match.params.id == 0){
      axios({
        url: PATH_API + `/product`,
        method: "POST",
        data: formdata,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res?.status === 200) {
            message.success("Success!");
            history.goBack();
          }
        })
        .catch((err) => {
          message.error("Something is wrong!");
        });
    }else{
      axios({
        url: PATH_API + `/product/${match.params.id}`,
        method: "PUT",
        data: formdata,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res?.status===200) {
            message.success("Success!");
            history.goBack();
          }
        })
        .catch((err) => {
          message.error("Something is wrong!");
        });
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="bank-add-wrapper">
        <div>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(e) => updateData(e)}
            autoComplete="off"
            layout="vertical"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>Product</h5>
              <div className="d-flex justify-content-end">
                <Button
                  className="d-flex justify-content-between align-items-center me-2"
                  type="primary"
                  onClick={() => history.goBack()}
                >
                  <LeftOutlined />
                  Orqaga
                </Button>
                <Button
                  className="d-flex justify-content-between align-items-center"
                  type="primary"
                  htmlType="submit"
                >
                  <CheckOutlined />
                  Saqlash
                </Button>
              </div>
            </div>
            <hr className="mt-1 mb-4" />
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-6">
                <Form.Item
                  label=""
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Kategoriyani tanlang!",
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Select
                    showSearch
                    placeholder="Kategoriya"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={(e) => setcategoryId(e)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      categories?.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6">
                <Form.Item
                  label=""
                  name="seasonId"
                  rules={[
                    {
                      required: true,
                      message: "Faslni tanlang!",
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Select
                    showSearch
                    placeholder="Fasl"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      seasons?.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6">
                <Form.Item
                  label=""
                  name="genderId"
                  rules={[
                    {
                      required: true,
                      message: "Jinsni tanlang!",
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Select
                    showSearch
                    placeholder="Jinsi"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      genders?.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6">
                <Form.Item
                  label=""
                  name="brandId"
                  rules={[
                    {
                      required: true,
                      message: "Brendni tanlang!",
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Select
                    showSearch
                    placeholder="Brend"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      brends?.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6">
                <Form.Item
                  label=""
                  name="sizeId"
                  rules={[
                    {
                      required: true,
                      message: "Sizeni tanlang!",
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Select
                    showSearch
                    placeholder="Size"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      sises?.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div>

              {/* <div className="col-lg-2 col-md-4 col-sm-6">
                <Form.Item
                  label=""
                  name="discountId"
                  rules={[
                    {
                      required: false,
                      message: "Chegirmani tanlang!",
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Select
                    showSearch
                    placeholder="Chegirma"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      disCount?.map((item, index) => (
                        <Option value={index}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div> */}
              
            </div>
            <PicturesWall setimages={setimages} images={images} />
            <div className="row">
                <div className="col-md-4">
                  <Form.Item
                    label="Product nomi"
                    name="name"
                    rules={[
                      { required: true, message: "Iltimos product nomini kiriting!" },
                    ]}
                  >
                    <Input type={"text"} placeholder="Nomi..." />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    label="Product narxi"
                    name="price"
                    rules={[
                      { required: true, message: "Iltimos narxini kiriting!" },
                    ]}
                  >
                    <Input type={"text"} placeholder="Narx..." />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    label="Product sotilish narxi"
                    name="salePrice"
                    rules={[
                      { required: true, message: "Iltimos sotilish narxini kiriting!" },
                    ]}
                  >
                    <Input type={"text"} placeholder="Sotilish narxi..." />
                  </Form.Item>
                </div>
            </div>

            <Form.Item
              label="Qisqacha malumot kiritish"
              name="shortDescription"
              rules={[
                {
                  required: true,
                  message: "Iltimos qisqacha malumot kiriting!",
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Qisqacha ma'lumot" />
            </Form.Item>

            <Form.Item
              label="Qo'shimcha malumot kiritish"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Iltimos qo'shimcha malumot kiriting!",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Qo'shimcha ma'lumot" />
            </Form.Item>

            <Form.Item
              label="Product holati"
              name="active"
              rules={[
                {
                  required: false,
                  message: "Iltimos chegirma amal qilish muddatini kiriting!",
                },
              ]}
            >
              <Switch
                onChange={() => setchecked(!checked)}
                checkedChildren="Active"
                unCheckedChildren="InActive"
                checked={checked}
              />
            </Form.Item>

          </Form>
        </div>
      </div>
    </Spin>
  );
};
export default AddProduct;
