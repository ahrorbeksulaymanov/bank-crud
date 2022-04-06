import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Switch } from "antd";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PATH_API, PATH_API_FILE } from "../../../constants";
import PicturesWall from "./imgUpload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";

const AddArticle = () => {
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(true);
  const [images, setimages] = useState([]);
  const match = useRouteMatch("/article-add/:id");
  const history = useHistory();
  const [form] = Form.useForm();
  const [textObject, setTextObject] = useState('');

  useEffect(() => {
    if (match.params.id != 0) {
      setloading(true);
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/article/${match.params.id}`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        form.setFieldsValue({
          title: res?.data?.data?.title,
          // description: res?.data?.data?.description,
        });
        setTextObject(res?.data?.data?.description)
        setchecked(res?.data?.data?.active);
        setloading(false);
        setimages([
          {
            uid: 1,
            name: "image.png",
            status: "done",
            url: PATH_API_FILE + res?.data?.data?.photo,
          },
        ]);
      });
    }
  }, []);

  const updateData = (val) => {
    if (images[0]) {
      const formdata = new FormData();
      val.active = checked;
      if (images[0]?.originFileObj) {
        formdata.append("photo", images[0]?.originFileObj);
      }
      formdata.append("active", checked ? 1 : 0);
      Object.keys(val).map((key) => {
        formdata.append(key, val[key]);
      });
      formdata.append("description", textObject);
      const token = localStorage.getItem("token");
      if (match.params.id == 0) {
        axios({
          url: PATH_API + `/article`,
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
      } else {
        axios({
          url: PATH_API + `/article/${match.params.id}`,
          method: "PUT",
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
      }
    } else {
      message.warn("Blog uchun rasm tanlang!");
    }
  };

  const getCKEditorVal = (e) => {
    setTextObject(e);
  };

  console.log("textObject", textObject);

  return (
    <Spin spinning={loading}>
      <div className="bank-add-wrapper">
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={(e) => updateData(e)}
            autoComplete="off"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>Maqola</h5>
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
              label="Maqola nomi"
              name="title"
              rules={[
                { required: true, message: "Iltimos Maqola nomini kiriting!" },
              ]}
            >
              <Input type={"text"} placeholder="Maqola nomi..." />
            </Form.Item>

            <Form.Item
              label="Maqola holati"
              name="active"
              className="my-5"
              rules={[
                { required: false, message: "Iltimos maqola holatini tanlang!" },
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
              label="Maqola uchun rasm"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Iltimos Maqola uchun rasm kiriting!",
                },
              ]}
            >
              <PicturesWall setimages={setimages} images={images} />
            </Form.Item>

           
          </Form>
          <CKEditor
            data={textObject}
            editor={ClassicEditor}
            config={{
              toolbar: {
                items: [
                  "heading",
                  "MathType",
                  "ChemType",
                  "exportPdf",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "imageUpload",
                  "imageStyle",
                  "mediaEmbed",
                  "insertTable",
                  "blockQuote",
                  "undo",
                  "redo",
                  "textTransformation",
                ],
              },
            }}
            onChange={(event, editor) => {
              getCKEditorVal(editor.getData());
            }}
          />
          
        </div>
      </div>
    </Spin>
  );
};
export default AddArticle;
