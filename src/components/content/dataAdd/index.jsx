import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "../style.scss";
import { Form, Input, Button, Select, message, Spin } from "antd";
import axios from "axios";
import { PATH_API } from "../../../constants";
import { useRouteMatch, useHistory } from "react-router-dom";

const { Option } = Select;

const AddBank = () => {
  const [status, setStatus] = useState([]);
  const [editData, setEditData] = useState({});
  const [loading, setloading] = useState(false);
  const match = useRouteMatch("/admin/bank/:id");
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      url: `http://templ-api.webase.uz/Helper/GetStateList`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setStatus(res?.data);
    });
  }, []);

  useEffect(() => {
    if (match.params.id != 0) {
      setloading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + "/Bank/Get",
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id: match.params.id,
        },
      }).then((res) => {
        setEditData(res?.data);
        form.setFieldsValue({
          code: res?.data?.Code,
          bankname: res?.data?.Bankname,
          stateid: Number(res?.data?.Stateid),
        });
        setloading(false);
      });
    }
  }, []);

  const updateData = (val, editData) => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/Bank/Update`,
      method: "POST",
      data: {
        id: editData?.ID || 0,
        code: val.code,
        bankname: val.bankname,
        stateid: val.stateid,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res?.data?.success) {
          message.success("Success!");
          history.goBack();
        }
      })
      .catch((err) => {
        message.error("Something is wrong!");
      });
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
            onFinish={(e) => updateData(e, editData)}
            autoComplete="off"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>User</h5>
              <div className="d-flex justify-content-end">
                <Button
                  className="d-flex justify-content-between align-items-center me-2"
                  type="primary"
                  onClick={() => history.goBack()}
                >
                  <LeftOutlined />
                  Back
                </Button>
                <Button
                  className="d-flex justify-content-between align-items-center"
                  type="primary"
                  htmlType="submit"
                >
                  <CheckOutlined />
                  Save
                </Button>
              </div>
            </div>
            <hr className="mt-1 mb-4" />
            <Form.Item
              label="bank Code"
              name="code"
              rules={[{ required: true, message: "Please input bank Code!" }]}
            >
              <Input placeholder="input bank code, please" />
            </Form.Item>

            <Form.Item
              label="bank name"
              name="bankname"
              className="my-5"
              rules={[{ required: true, message: "Please input bank name!" }]}
            >
              <Input placeholder="input bank name, please" />
            </Form.Item>

            <Form.Item
              name="stateid"
              label="StateId"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select editData, please"
                allowClear
                defaultActiveFirstOption={true}
              >
                {status?.map((item, index) => (
                  <Option key={index} value={Number(item.id)}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};
export default AddBank;
