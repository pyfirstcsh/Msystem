import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Form, Input, Modal, Select } from "antd";
import { Message } from "../dataType";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Message) => void;
  onCancel: () => void;
}
// 收集表单
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="添加用户"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        size="small"
        name="form_in_modal"
        scrollToFirstError={true}
      >
        <Form.Item
          name="name"
          label="姓名"
          key="name"
          rules={[
            {
              required: true,
              message: "姓名为空，请输入姓名！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="major"
          label="专业"
          key="major"
          rules={[
            {
              required: true,
              message: "专业为空，请输入专业！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="grade"
          label="年级"
          key="grade"
          rules={[
            {
              required: true,
              message: "年级为空，请输入年级！",
            },
          ]}
        >
          <Select>
            <Select.Option value="2022">2022级</Select.Option>
            <Select.Option value="2021">2021级</Select.Option>
            <Select.Option value="2020">2020级</Select.Option>
            <Select.Option value="2019">2019级</Select.Option>
            <Select.Option value="2018">2018级</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="sex"
          label="性别"
          key="sex"
          rules={[
            {
              required: true,
              message: "性别为空，请输入性别！",
            },
          ]}
        >
          <Select>
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
            <Select.Option value="未知">未知</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone"
          label="电话"
          key="phone"
          rules={[
            {
              required: true,
              message: "电话为空，请输入电话！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          key="email"
          rules={[
            {
              required: true,
              message: "邮箱为空，请输入邮箱！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="headPic"
          label="头像"
          key="headPic"
          rules={[
            {
              required: true,
              message: "头像为空，请输入头像！",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;
