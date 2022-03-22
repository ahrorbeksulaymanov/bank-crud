import { Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import InputMask from "react-input-mask";

const SubmitData = ({isModalVisible, setIsModalVisible}) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
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
          layout="vertical"
        >
          <Form.Item
            label="Ismingiz"
            name="name"
            rules={[
              { required: true, message: "Iltimos ismingizni kiriting!" },
            ]}
          >
            <Input placeholder="Ism..." />
          </Form.Item>

          <Form.Item
            label="Telefon raqamingiz"
            name="number"
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
              onChange={(e) => console.log(e.target.value)}
              className="input_mask_tel"
              placeholder="Raqam..."
            />
          </Form.Item>

          <Form.Item
            name="text"
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
              onClick={() => {
                setIsModalVisible(false);
                message.success("So'rovingiz jonatildi!");
              }}
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
