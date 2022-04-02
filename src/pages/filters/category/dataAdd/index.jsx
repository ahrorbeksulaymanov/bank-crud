import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Switch, Select } from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API } from "../../../../constants";
import { getCategories, getGenders, getSeasons } from "../../../../functions";
const { Option } = Select;

const AddCategory = () => {
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(true);
  const [seasons, setseasons] = useState([]);
  const [categories, setcategories] = useState([]);
  const [genders, setgenders] = useState([]);
  const match = useRouteMatch("/category-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (match.params.id != 0) {
      setloading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/category/${match.params.id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        form.setFieldsValue({
          name: res?.data?.data?.name,
          description: res?.data?.data?.description,
          seasonId: res?.data?.data?.seasonId,
          parentId: res?.data?.data?.parent,
        });
        setchecked(res?.data?.data?.active);
        setloading(false);
      });
    }
  }, []);

  useEffect(() => {
    getCategories().then((res) => {
      if (res?.status === 200) {
        setcategories(res?.data?.data);
      }
    });
    getSeasons().then((res) => {
      if (res?.status === 200) {
        setseasons(res?.data?.data);
      }
    });

    getGenders().then((res) => {
      if (res?.status === 200) {
        setgenders(res?.data?.data);
      }
    });
  }, []);

  const updateData = (val) => {
    val.active = checked;
    const token = localStorage.getItem("token");
    if (match.params.id == 0) {
      axios({
        url: PATH_API + `/category?parentId=0`,
        method: "POST",
        data: val,
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
    } else {
      axios({
        url: PATH_API + `/category/${match.params.id}`,
        method: "PUT",
        data: val,
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
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="bank-add-wrapper">
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={(e) => updateData(e)}
            autoComplete="off"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>Categoriya</h5>
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
            <Form.Item
              label="Parent categoriya"
              name="parentId"
              rules={[
                {
                  required: false,
                  message: "Iltimos parent categoriyani kiriting!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Categoriya"
                optionFilterProp="children"
                allowClear
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {categories?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Fasl"
              name="seasonId"
              rules={[
                {
                  required: true,
                  message: "Iltimos faslni kiriting!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Fasl"
                optionFilterProp="children"
                allowClear
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {seasons?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Gender"
              name="genderId"
              rules={[
                {
                  required: true,
                  message: "Iltimos genderni kiriting!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Gender"
                optionFilterProp="children"
                allowClear
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {genders?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Categoriya nomi"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Iltimos categoriya nomini kiriting!",
                },
              ]}
            >
              <Input type={"text"} placeholder="Categoriya..." />
            </Form.Item>

            <Form.Item
              label="Categoriya holati"
              name="active"
              className="my-5"
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

            <Form.Item
              label="Qo'shimcha malumot kiritish"
              name="description"
              className="my-5"
              rules={[
                {
                  required: true,
                  message: "Iltimos qo'shimcha malumot kiriting!",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Qo'shimcha ma'lumot" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};
export default AddCategory;
