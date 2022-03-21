import React, { useState } from "react";
import "./style.scss";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Dropdown } from "antd";

const { Header, Sider, Content } = Layout;

const MyLayout = ({ children }) => {
  
  const logOut = () => {
    localStorage.clear();
    history.push("/login");
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="d-flex align-items-center justify-content-start">
          <UserOutlined className="me-2" /> Profile
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div className="d-flex align-items-center justify-content-start">
          <SettingOutlined className="me-2" /> Settings
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <div
          onClick={() => logOut()}
          className="d-flex align-items-center justify-content-start"
        >
          <LoginOutlined className="me-2" /> Log out
        </div>
      </Menu.Item>
    </Menu>
  );
  const [collapsed, setcollapsed] = useState(false);
  const history = useHistory();
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu theme="dark" mode="inline" >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin">Banks</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/pageone">Page one</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/pagetwo">page two</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setcollapsed(!collapsed),
            }
          )}
          <div className="profile-avatar">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="profile-avatar-data d-flex justify-content-center align-items-center mt-2 pointer text-danger">
                HB
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background content-layout"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;
