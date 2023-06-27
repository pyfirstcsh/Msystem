import axios from "axios";
import "antd/dist/antd.min.css";
import "./index.css";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { User } from "../dataType";
// 初始登录框
const Login: React.FC = () => {
  const nav = useNavigate();
  const onFinish = (values: User) => {
    const { user, pwd } = values;
    // 发送登录请求
    axios({
      method: "post",
      url: "/api/user/login",
      data: {
        user: user,
        pwd: pwd,
      },
    }).then(function (response) {
      if (response.data.code === -1) {
        Modal.error({
          title: "登录失败！",
          content: "请确认用户名和密码！",
        });
        console.log("error");
      } else if (response.data.code === 0) {
        console.log("ok");
        nav("/main");
      }
    });
  };
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        size="middle"
        onFinish={onFinish}
      >
        <Form.Item
          name="user"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
