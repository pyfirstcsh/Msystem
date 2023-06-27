import React, { useEffect, useState } from "react";
import { Avatar, Form, Modal, Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Message } from "../dataType";
import AlterCreateForm from "../AlterForm";
import axios from "axios";
const { confirm } = Modal;
interface Props {
  total: number;
  setTotal: (values: number) => void;
  totalM: number;
  setTotalM: (values: number) => void;
  messageList: Message[];
  setMessageList: (values: Message[]) => void;
  disabledPage: boolean;
}
// 学生信息Table内容，包括实现的修改表单
const MemberList: React.FC<Props> = ({
  total,
  totalM,
  setTotalM,
  messageList,
  setMessageList,
  disabledPage,
}) => {
  const nav = useNavigate();
  // 修改表单标识
  const [openAlter, setOpenAlter] = useState(false);
  // 分页器页数
  const [page, setPage] = useState(1);
  // 分页器页面数据个数
  const [pageSize, setPageSize] = useState(5);
  // 修改时选择的元组的id
  const [id, setId] = useState("");
  // 请求数据,page,pageSize,主表格展示,page改变时触发
  useEffect(() => {
    // 发送 get /api/stu/list 请求
    axios({
      method: "get",
      url: "/api/stu/list",
      params: {
        page: page,
        pageSize: pageSize,
      },
    }).then(function (response) {
      setTotalM(response.data.total);
      setMessageList(response.data.list);
    });
  }, [page]);
  // 点击查看时触发,_id为该条记录的id,带参转到路由
  const handleDetails = (_id: string) => {
    nav("/main/details/" + _id);
  };
  // 点击修改时触发，_id为该条记录的id
  const handleAlter = (_id: string) => {
    setId(_id);
    axios({
      method: "get",
      url: "/api/stu/id",
      params: {
        id: _id,
      },
    }).then(function (response) {
      // 设置填充值
      form.setFieldsValue(response.data.stuM);
    });
    // 弹出修改框
    setOpenAlter(true);
  };
  // 点击删除时触发
  const handleDelete = (_id: string) => {
    confirm({
      title: "删除学生",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认要删除这位学生信息？",
      onOk() {
        // 发送 post /api/stu/delete 请求
        axios({
          method: "post",
          url: "/api/stu/delete",
          data: {
            id: _id,
          },
        }).then(function (response) {
          if (response.data.code === 0) {
            Modal.success({
              title: "成功!",
              content: "删除用户成功！",
            });
          } else {
            Modal.error({
              title: "失败!",
              content: "删除用户失败！",
            });
          }
        });
        // 获取删除后当前页的新数据
        axios({
          method: "get",
          url: "/api/stu/list",
          params: {
            page: page,
            pageSize: pageSize,
          },
        }).then(function (response) {
          setTotalM(response.data.total);
          setMessageList(response.data.list);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 修改成功时触发
  const onCreateAlter = (values: Message) => {
    // 发送post  "/api/stu/update"请求 id 为标识
    axios({
      method: "post",
      url: "/api/stu/update",
      data: {
        id: id,
        data: values,
      },
    }).then(function (response) {
      if (response.data.code === 0) {
        Modal.success({
          title: "成功!",
          content: "修改用户成功！",
        });
      } else {
        Modal.error({
          title: "失败!",
          content: "修改用户失败！",
        });
      }
    });
    // 关闭修改弹出框
    setOpenAlter(false);
    // 获取修改后当前页的新数据
    axios({
      method: "get",
      url: "/api/stu/list",
      params: {
        page: page,
        pageSize: pageSize,
      },
    }).then(function (response) {
      setMessageList(response.data.list);
    });
  };
  // 更换页码时触发
  const onChangePage = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const [form] = Form.useForm();
  const paginationProps = {
    disabled: !disabledPage,
    pageSize: 5, // 每页数据条数
    total: total, // 总条数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };
  // Table columns 类型
  const columns: ColumnsType<Message> = [
    {
      title: "头像",
      dataIndex: "headPic",
      key: "headPic",
      render: (text, record) => <Avatar src={record.headPic} />,
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      render: (text, { sex }) => (
        <>
          <Tag color={sex === "男" ? "blue" : sex === "女" ? "green" : "red"}>
            {sex}
          </Tag>
        </>
      ),
      filters: [
        {
          text: "男",
          value: "男",
        },
        {
          text: "女",
          value: "女",
        },
        {
          text: "未知",
          value: "未知",
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.sex === value,
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "操作",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Space>
          <a onClick={() => handleDetails(record.id)}> 查看</a>
          <a onClick={() => handleAlter(record.id)}> 修改</a>
          <a onClick={() => handleDelete(record.id)}> 删除</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={messageList}
        pagination={paginationProps}
        rowKey={(record) => record.id}
      />
      <Pagination
        disabled={disabledPage}
        onChange={onChangePage}
        total={totalM}
        defaultPageSize={5}
        defaultCurrent={1}
      />
      <AlterCreateForm
        openAlter={openAlter}
        onCreateAlter={onCreateAlter}
        onCancel={() => {
          setOpenAlter(false);
        }}
        form={form}
      />
    </>
  );
};

export default MemberList;
