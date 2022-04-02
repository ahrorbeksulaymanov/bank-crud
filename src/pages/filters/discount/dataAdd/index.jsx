import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, DatePicker, Switch } from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API } from "../../../../constants";
import moment from 'moment';

const AddDiscount = () => {
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(true);
  const match = useRouteMatch("/discount-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    if (match.params.id != 0) {
      setloading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/discount/${match.params.id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        form.setFieldsValue({
          percent: res?.data?.data?.percent,
          expirationDate: moment((res?.data?.data?.expirationDate).slice(0, 10).format(dateFormat)),
          description: res?.data?.data?.description,
        });
        setloading(false);
        setchecked(res?.data?.data?.active)
      });
    }
  }, []);

  const updateData = (val) => {
    val.name = 'ddd';
    val.active = checked?1:0;
    const token = localStorage.getItem("token");
    if(match.params.id == 0){
      axios({
        url: PATH_API + `/discount`,
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
        url: PATH_API + `/discount/${match.params.id}`,
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
              <DatePicker format={dateFormat} className="w-100" />
            </Form.Item>

            <Form.Item
              label="Gender holati"
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
export default AddDiscount;
