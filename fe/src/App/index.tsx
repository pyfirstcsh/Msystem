import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ExclamationCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
const { confirm } = Modal;
const { Sider } = Layout;
// 主界面对应路由/main/,包括侧边导航栏和主题内容，导航栏固定不变，主体内容根据子路由进行选择
const App: React.FC = () => {
  const nav = useNavigate();
  // 导航栏是否折叠
  const [collapsed, setCollapsed] = useState(true);
  // 退出登录函数处理
  const handleDeleteUser = () => {
    // 弹出退出确认按钮
    confirm({
      title: "退出系统！",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认要退出系统？",
      onOk() {
        // 发送post  "/api/user/logout"退出请求。
        axios({
          method: "post",
          url: "/api/user/logout",
        }).then(function (response) {
          if (response.data.code === 0) {
            Modal.success({
              title: "退出成功！",
              content: "您已成功退出系统！",
            });
            // 返回登录页面
            nav("/");
          } else {
            console.log("error");
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 导航栏处理事件，根据key值选择对应子选项
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key == "0") {
      // 主界面
      nav("/main/");
    }
    if (e.key == "1") {
      // 主界面
      nav("/main/");
    }
    if (e.key == "2") {
      // 查看介绍
      nav("/main/about");
    }
    if (e.key == "3") {
      // 退出登录
      handleDeleteUser();
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 侧边栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "0",
              icon: <HomeOutlined />,
              label: "学生管理系统",
            },
            {
              key: "1",
              icon: <UserOutlined />,
              label: "学生信息",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "关于介绍",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "退出登录",
            },
          ]}
          onClick={handleMenuClick}
        />
        {/* 折叠操作 */}
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
        )}
      </Sider>
      {/* 占位符，/main/的子节点都要在这 */}
      <Outlet />
    </Layout>
  );
};

export default App;
