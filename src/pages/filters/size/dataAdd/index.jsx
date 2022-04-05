import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Switch, Select } from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API } from "../../../../constants";
const { Option } = Select;

const AddSize = () => {
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(true);
  const [categories, setcategories] = useState([]);
  const match = useRouteMatch("/size-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (match.params.id != 0) {
      const token = localStorage.getItem("token");
      setloading(true);
      axios({
        url: PATH_API + `/size/${match.params.id}?expand=category`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        }
      }).then((res) => {
        form.setFieldsValue({
          name: res?.data?.data?.name,
          description: res?.data?.data?.description,
          categoryId: res?.data?.data?.category?.id,
        });
        setchecked(res?.data?.data?.active)
        setloading(false);
      });
    }
  }, []);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/category`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((res) => {
      if(res?.status === 200){
        setcategories(res?.data?.data)
      }
    });
  }, []);

  const updateData = (val) => {
    val.active = checked
    const token = localStorage.getItem("token");
    if(match.params.id == 0){
      axios({
        url: PATH_API + `/size`,
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
    }else{
      axios({
        url: PATH_API + `/size/${match.params.id}`,
        method: "PUT",
        data: val,
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={(e) => updateData(e)}
            autoComplete="off"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>O'lchamlar</h5>
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
                  label="Kategoriya"
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Kategoriyani tanlang!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Kategoriya"
                    optionFilterProp="children"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={(e) => console(e)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      categories?.map((item, index) => (
                        <Option key={index} value={index}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
            <Form.Item
              label="O'lcham nomi"
              name="name"
              rules={[{ required: true, message: "Iltimos o'lcham nomini kiriting!" }]}
            >
              <Input type={'text'} placeholder="O'lcham..." />
            </Form.Item>

            <Form.Item
              label="O'lcham holati"
              name="active"
              className="my-5"
              rules={[{ required: false, message: "Iltimos chegirma amal qilish muddatini kiriting!" }]}
            >
              <Switch onChange={() => setchecked(!checked)} checkedChildren="Active" unCheckedChildren="InActive" checked={checked} />
            </Form.Item>

            <Form.Item
              label="Qo'shimcha malumot kiritish"
              name="description"
              className="my-5"
              rules={[{ required: true, message: "Iltimos qo'shimcha malumot kiriting!" }]}
            >
              <Input.TextArea rows={4} placeholder="Qo'shimcha ma'lumot" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};
export default AddSize;
