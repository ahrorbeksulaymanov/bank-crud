import { Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import product2 from "../../assets/images/main-r1.jpg";
import { PATH_API } from "../../constants";
const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    values.confirm = 0;
    axios({
      url: PATH_API + `/contact`,
      method: "POST",
      data: values,
    })
      .then((res) => {
        if (res?.status === 200) {
          message.success("Habaringiz jonatildi!");
          form.setFieldsValue();
        }
      })
      .catch((err) => {
        message.error("Xatolik bor!");
      });
  };

  return (
    <div>
      <div className="row py-5">
        <div className="col-md-6">
          <h4 className="mb-5">Biz bilan aloqa</h4>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="To'liq ism familiyangiz"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Iltimos ism familiyangizni kiriting!",
                },
              ]}
            >
              <Input placeholder="Ism familiya" />
            </Form.Item>
            <Form.Item
              label="Telefon nomeringiz"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Iltimos Telefon nomeringizni kiriting!",
                },
              ]}
            >
              <Input placeholder="Tel nomer" />
            </Form.Item>

            <Form.Item
              label="Emailingiz"
              name="email"
              rules={[
                { required: true, message: "Iltimos Emailingizni kiriting!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Habar qoldirish"
              name="description"
              rules={[
                { required: false, message: "Please input your password!" },
              ]}
            >
              <TextArea rows={8} />
            </Form.Item>

            <Form.Item>
              <button htmlType="submit" className="offer-button-modal">
                Jo'natish
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <h4 className="mb-5">Paragraph</h4>
          <img src={product2} className="w-100 mb-5" alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            labore aspernatur cumque inventore voluptatibus odit doloribus!
            Ducimus, animi perferendis repellat. Ducimus harum alias quas,
            quibusdam provident ea sed, sapiente quo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            labore aspernatur cumque inventore voluptatibus odit doloribus!
            Ducimus, animi perferendis repellat. Ducimus harum alias quas,
            quibusdam provident ea sed, sapiente quo.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
