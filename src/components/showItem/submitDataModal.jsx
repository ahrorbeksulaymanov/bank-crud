import { Form, Input, message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { PATH_API } from "../../constants";

const SubmitData = ({isModalVisible, setIsModalVisible, id}) => {
const [count, setcount] = useState(1);
const [form] = Form.useForm();
  const onFinish = (values) => {
    values.confirm = 0;
    values.productId = id;
    values.count = count;
    axios({
      url: PATH_API + `/order`,
      method: "POST",
      data:values,
    }).then((res) => {
      if (res?.status === 200) {
        setIsModalVisible(false)
        message.success("So'rovingiz jonatildi!");
        form.setFieldsValue({});
      }
    });
  };
  return (
    <div>
      <Modal
        title="Form (Biz sizga 2 soat ichida aloqaga chiqamiz!&#128522;)"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={false}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="To'liq ismingiz"
            name="fullName"
            rules={[
              { required: true, message: "Iltimos ismingizni kiriting!" },
            ]}
          >
            <Input placeholder="Ism..." />
          </Form.Item>

          <Form.Item
            label="Telefon raqamingiz"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Iltimos telefon nomeringizni kiriting!",
              },
            ]}
          >
            <InputMask
              mask="+\9\9\8 99 999 99 99"
              maskChar=" "
              className="input_mask_tel"
              placeholder="Raqam..."
            />
          </Form.Item>
            <div onClick={() => {count > 1 && setcount(count-1)}} className="btn btn-light">-</div>
            <span className="mx-3">{count}</span>
            <div onClick={() => setcount(count+1)} className="btn btn-light">+</div>
          <Form.Item
            name="description"
            label="Xabar"
            rules={[{ required: false, message: "" }]}
          >
            <Input.TextArea
              showCount
              rows={4}
              maxLength={100}
              placeholder="Xabar qoldirish..."
            />
          </Form.Item>
          <hr className="mt-5" />
          <Form.Item>
            <button
              className="offer-button-modal"
              type="primary"
              htmlType="submit"
            >
              Jonatish
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default SubmitData;
