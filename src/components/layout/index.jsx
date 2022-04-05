import React, { useContext, useEffect, useState } from "react";
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
  ContactsOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Dropdown } from "antd";
import MainContext from "../../context";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const MyLayout = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const history = useHistory();
  const { user } = useContext(MainContext);
  // const history = useHistory();
  // useEffect(() => {
  //   if(user){
  //     history.push('/login')
  //   }
  // }, []);
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


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin">
              Userlar
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/brand">
              Brandlar
            </Link>
          </Menu.Item>
          <Menu
            theme="dark" mode="inline"
            style={{ borderRight: 0, }}
          >
            <SubMenu key="sub1" icon={<SortDescendingOutlined />} title="Filterlar">
              <Menu.Item key="11">
                <Link to="/discount">
                  Skidkalar
                </Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to="/size">
                  Sizelar
                </Link>
              </Menu.Item>
              <Menu.Item key="13">
                <Link to="/season">
                  Fasllar
                </Link>
              </Menu.Item>
              <Menu.Item key="14">
                <Link to="/gender">
                  Jinsi
                </Link>
              </Menu.Item>
              <Menu.Item key="15">
                <Link to="/category">
                  Categoriyalar
                </Link>
              </Menu.Item>
              <Menu.Item key="16">
                <Link to="/color">
                  Ranglar
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/product">Product</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<VideoCameraOutlined />}>
            <Link to="/orders">
              Buyurtmalar
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<VideoCameraOutlined />}>
            <Link to="/blogs-list">
              Bloglar
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ContactsOutlined />}>
            <Link to="/contact-admin">
              Kontaktlar
            </Link>
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
                {user?.firstName && user?.firstName[0]}
                {user?.lastName && user?.lastName[0]}
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
