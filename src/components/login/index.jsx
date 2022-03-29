import React from "react";
import "./style.scss";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { PATH_API } from "../../constants";
import {useHistory} from "react-router-dom"
import loginImg from '../../assets/images/login-img.jpg'

const LoginPage = () => {

    const history = useHistory()

  // const onFinish = (values) => {
  //   axios({
  //     url: PATH_API + `/Account/GenerateToken`,
  //     method: "POST",
  //     data: {
  //       username: values.username,
  //       password: values.password
  //     },
  //   }).then((res) => {
  //     localStorage.setItem("token", res?.data?.token)
  //     localStorage.setItem("tokenExpiration", 1645372769277)
  //     history.push('/admin')
  //   }).catch((err) => {
  //       message.error("Неправильное имя пользователя или пароль.")
  //   })
  // };

  const onFinish = (values) => {
       axios({
      url: PATH_API + `/auth/login`,
      method: "POST",
      data: {
        username: values.username,
        password: values.password
      },
    }).then((res) => {
      if(res?.status == 200){
        localStorage.setItem("token", res?.data?.token)
        // localStorage.setItem("tokenExpiration", 1645372769277)
        history.push('/admin')
      }else{
        message.error("Login yoki parolni xato kiritdingiz qaytadan urinib ko'ring!")
      }
    }).catch((err) => {
        message.error("Login yoki parolni xato kiritdingiz qaytadan urinib ko'ring!")
    })
  }

  return (
    <div className="big-div-login">
      <div className="row m-0">
        <div className="col-md-8 p-0">
          <img src={loginImg} alt="" />
        </div>
        <div className="col-md-4 p-0">
          <div className="d-flex align-items-center justify-content-center height_100">
            <div>
              <h4>Welcome to Admin panel</h4>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input className="w-100" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password className="w-100" />
                </Form.Item>

                <Form.Item className="text-center">
                  <button className="w-100 login-button" type="primary" htmlType="submit">
                    Login
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;