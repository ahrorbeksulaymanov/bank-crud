import React from "react";
import "./style.scss";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { PATH_API } from "../../constants";
import {useHistory} from "react-router-dom"

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
      history.push('/')
    }).catch((err) => {
        message.error("Неправильное имя пользователя или пароль.")
    })
  };

  return (
    <div className="big-div-login d-flex justify-content-center align-items-center">
      <div className="login-inputs">
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
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
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
