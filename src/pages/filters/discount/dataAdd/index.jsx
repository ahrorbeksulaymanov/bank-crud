import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, DatePicker } from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API } from "../../../../constants";

const AddDiscount = () => {
  const [editData, setEditData] = useState({});
  const [loading, setloading] = useState(false);
  const match = useRouteMatch("/discount-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();

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

  const updateData = (val) => {
    const token = localStorage.getItem("token");
    axios({
      url: PATH_API + `/discount`,
      method: "POST",
      data: val,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        message.success("Success!");
        history.goBack();
        // if (res?.data?.success) {
        // }
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
            onFinish={(e) => updateData(e)}
            autoComplete="off"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>Skidka</h5>
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
              label="Chegirmani kiriting (%)"
              name="percent"
              rules={[{ required: true, message: "Iltimos chegirmani kiriting!" }]}
            >
              <Input type={'number'} placeholder="Chegirma..." />
            </Form.Item>

            <Form.Item
              label="Chegirma amal qilish muddati"
              name="expirationDate"
              className="my-5"
              rules={[{ required: true, message: "Iltimos chegirma amal qilish muddatini kiriting!" }]}
            >
              <DatePicker className="w-100" />
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
export default AddDiscount;
