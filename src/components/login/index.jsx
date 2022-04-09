import React, {useContext} from "react";
import "./style.scss";
import {Form, Input, Button, message} from "antd";
import axios from "axios";
import {PATH_API} from "../../constants";
import {useHistory} from "react-router-dom";
import loginImg from "../../assets/images/login-img.jpg";
import MainContext from "../../context";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const {user, setUser} = useContext(MainContext);

    const onFinish = (values) => {
        axios({
            url: PATH_API + `/auth/login`,
            method: "POST",
            data: {
                username: values.username,
                password: values.password,
            },
        })
            .then((res) => {
                if (res?.status === 200) {
                    localStorage.setItem("token", res?.data?.token);
                    axios({
                        url: PATH_API + `/auth/me`,
                        method: "get",
                        headers: {
                            Authorization: "Bearer " + res?.data?.token,
                        },
                    })
                        .then((res) => {
                            if (res?.status === 200) {
                                setUser(res.data);
                                history.push("/admin");
                            } else {
                                localStorage.clear();
                                form.resetFields()
                            }
                        })
                        .catch((err) => {
                            form.resetFields();
                            localStorage.clear();
                        });
                } else {
                    message.error(
                        "Login yoki parolni xato kiritdingiz qaytadan urinib ko'ring!"
                    );
                }
            })
            .catch((err) => {
                message.error(
                    "Login yoki parolni xato kiritdingiz qaytadan urinib ko'ring!"
                );
            });
    };

    return (
        <div className="big-div-login">
            <div className="row m-0">
                <div className="col-md-8 p-0">
                    <img src={loginImg} alt=""/>
                </div>
                <div className="col-md-4 p-0">
                    <div className="height_100">
                        <div className="pt-5 ms-4">
                            <Link to='/' >Asosiy sahifaga o'tish</Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-center height_90">
                            <div>
                                <h4>Welcome to Admin panel</h4>
                                <Form
                                    form={form}
                                    name="basic"
                                    initialValues={{remember: true}}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {required: true, message: "Please input your username!"},
                                        ]}
                                    >
                                        <Input className="w-100"/>
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {required: true, message: "Please input your password!"},
                                        ]}
                                    >
                                        <Input.Password className="w-100"/>
                                    </Form.Item>

                                    <Form.Item className="text-center">
                                        <button
                                            className="w-100 login-button"
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Login
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
