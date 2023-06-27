import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { useParams } from "react-router-dom";
import { Breadcrumb, Form, Layout } from "antd";
import { Image } from "antd";
import { Message } from "../dataType";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
import axios from "axios";
type Params = {
  _id: string;
};
// 学生信息详情
const Details: React.FC = () => {
  // 学生信息记录
  const [message, setMessage] = useState<Message>();
  // 路由传入的id
  const params = useParams<Params>();
  // 根据id 获取学生信息
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/stu/id",
      params: {
        id: params._id,
      },
    }).then(function (response) {
      setMessage(response.data.stuM);
    });
  }, []);
  return (
    <Layout className="site-layout">
      {/* 顶部面包屑 */}
      <Header className="header">
        <Breadcrumb
          style={{
            margin: "24px 16px",
          }}
        >
          <Breadcrumb.Item href="#/main/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span>详细信息</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "12px 8px",
          padding: "24px 24px 0 24px",
          minHeight: 280,
        }}
      >
        {/* 学生信息整体内容 */}
        <Form>
          <Form.Item name="headPic" label="头像">
            <Image width={180} src={message?.headPic} />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <span>{message?.name}</span>
          </Form.Item>
          <Form.Item name="sex" label="性别">
            <span>{message?.sex}</span>
          </Form.Item>
          <Form.Item name="grade" label="年级">
            <span>{message?.grade}</span>
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <span>{message?.email}</span>
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <span>{message?.phone}</span>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Details;
