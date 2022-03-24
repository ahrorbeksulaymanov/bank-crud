import React from "react";
import "./style.scss";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { PATH_API } from "../../constants";
import {useHistory} from "react-router-dom"
import loginImg from '../../assets/images/login-img.jpg'

const LoginPage = () => {

    const history = useHistory()

  const onFinish = (values) => {
    axios({
      url: PATH_API + `/Account/GenerateToken`,
      method: "POST",
      data: {
        username: values.username,
        password: values.password
      },
    }).then((res) => {
      localStorage.setItem("token", res?.data?.token)
      localStorage.setItem("tokenExpiration", 1645372769277)
      history.push('/admin')
    }).catch((err) => {
        message.error("Неправильное имя пользователя или пароль.")
    })
  };

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


// import React from "react";
// import "./style.scss";
// import { Form, Input, Button, message } from "antd";
// import axios from "axios";
// import { PATH_API } from "../../constants";
// import {useHistory} from "react-router-dom"

// const LoginPage = () => {

//     const history = useHistory()

//   const onFinish = (values) => {
//     axios({
//       url: PATH_API + `/Account/GenerateToken`,
//       method: "POST",
//       data: {
//         username: values.username,
//         password: values.password
//       },
//     }).then((res) => {
//       localStorage.setItem("token", res?.data?.token)
//       localStorage.setItem("tokenExpiration", 1645372769277)
//       history.push('/')
//     }).catch((err) => {
//         message.error("Неправильное имя пользователя или пароль.")
//     })
//   };

//   return (
//     <div className="big-div-login d-flex justify-content-center align-items-center">
//       <div className="login-inputs">
//         <h4>Welcome to Admin panel</h4>
//         <Form
//           name="basic"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item className="text-center">
//             <Button type="primary" htmlType="submit">
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };
// export default LoginPage;
