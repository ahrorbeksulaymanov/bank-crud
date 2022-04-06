import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Switch } from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API, PATH_API_FILE } from "../../../constants";
import PicturesWall from "./imgUpload";

const AddBrand = () => {
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(true);
  const [images, setimages] = useState([]);
  const match = useRouteMatch("/brand-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (match.params.id != 0) {
      setloading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/brand/${match.params.id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        form.setFieldsValue({
          name: res?.data?.data?.name,
          brandName: res?.data?.data?.brnadName,
          description: res?.data?.data?.description,
        });
        setchecked(res?.data?.data?.active)
        setloading(false);
        setimages([
          {
            uid: 1,
            name: "image.png",
            status: "done",
            url: PATH_API_FILE + res?.data?.data?.photoId,
          },
        ]);
      });
    }
  }, []);

  const updateData = (val) => {
    if (images[0]){

      val.active = checked
      const token = localStorage.getItem("token");

      const formdata = new FormData();
      val.active = checked;
      if (images[0]?.originFileObj) {
        formdata.append("photo", images[0]?.originFileObj);
      }
      formdata.append("active", checked ? 1 : 0);
      Object.keys(val).map((key) => {
        formdata.append(key, val[key]);
      });

      if(match.params.id == 0){
        axios({
          url: PATH_API + `/brand`,
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
          url: PATH_API + `/brand/${match.params.id}`,
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
    }else{
      message.warn("Blog uchun rasm tanlang!");
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
              <h5>Brand</h5>
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
              label="Nomi"
              name="name"
              rules={[{ required: true, message: "Iltimos nomini kiriting!" }]}
            >
              <Input type={'text'} placeholder="Nomi..." />
            </Form.Item>
            <Form.Item
              label="Brand nomi"
              name="brandName"
              rules={[{ required: true, message: "Iltimos brand nomini kiriting!" }]}
            >
              <Input type={'text'} placeholder="Brend nomi..." />
            </Form.Item>

            <Form.Item
              label="Brand holati"
              name="active"
              className="my-5"
              rules={[{ required: false, message: "Iltimos chegirma amal qilish muddatini kiriting!" }]}
            >
              <Switch onChange={() => setchecked(!checked)} checkedChildren="Active" unCheckedChildren="InActive" checked={checked} />
            </Form.Item>

            <Form.Item
              label="Brand uchun rasm"
              name="title"
              rules={[
                {
                  required: false,
                  message: "Iltimos Brand uchun rasm kiriting!",
                },
              ]}
            >
              <PicturesWall setimages={setimages} images={images} />
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
export default AddBrand;
