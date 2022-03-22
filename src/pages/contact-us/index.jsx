import { Form, Input } from "antd";
import React from "react";
import product2 from "../../assets/images/main-r1.jpg";
const { TextArea } = Input;

const ContactUs = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <div className="row py-5">
        <div className="col-md-6">
          <h4 className="mb-5">Contact Form</h4>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input Name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input Phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Write message"
              name="title"
              rules={[
                { required: false, message: "Please input your password!" },
              ]}
            >
              <TextArea rows={8} />
            </Form.Item>

            <Form.Item>
              <button htmlType="submit" className="offer-button-modal">
                SEND MESSAGE
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <h4 className="mb-5">Paragraph</h4>
          <img src={product2} className='w-100 mb-5' alt="" />
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
