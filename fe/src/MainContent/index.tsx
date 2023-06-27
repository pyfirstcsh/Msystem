import "./index.css";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Modal, Select, Space, Tooltip } from "antd";
import axios from "axios";
import React, { useState } from "react";
import CollectionCreateForm from "../CollectionForm";
import MemberList from "../Content";
import { Message } from "../dataType";
const { Header, Content } = Layout;
const { Search } = Input;
// 主界面主体内容"/main"学生信息
const MainContent: React.FC = () => {
  // collectionForm弹出标识
  const [open, setOpen] = useState(false);
  // 分页器禁用标识
  const [disabledPage, setDisabledPage] = useState(false);
  // 筛选出的信息条数,在查询,筛选时作用
  const [total, setTotal] = useState(0);
  // 总数据信息条数,在添加,删除时作用
  const [totalM, setTotalM] = useState(0);
  // 主界面Table的信息源数据
  const [messageList, setMessageList] = useState<Message[]>([]);
  // 根据姓名查找学生信息，value即为输入的姓名信息
  const onSearch = (value: string) => {
    //发送 get "/api/stu/name"请求
    axios({
      method: "get",
      url: "/api/stu/name",
      params: {
        name: value,
      },
    }).then(function (response) {
      // 返回的有查询得到的总个数以及学生信息表
      if (response.data.code == 0) {
        setTotal(response.data.total);
        setDisabledPage(true);
        setMessageList(response.data.stuMs);
      } else {
        Modal.error({
          title: "失败!",
          content: "搜索用户不存在！",
        });
      }
    });
  };
  // 根据收集表得到的信息，创建新的学生信息
  const onCreate = (values: Message) => {
    // 发送 post "/api/stu/create" 请求
    axios({
      method: "post",
      url: "/api/stu/create",
      data: {
        data: values,
      },
    }).then(function (response) {
      if (response.data.code === 0) {
        Modal.success({
          title: "成功!",
          content: "创建用户成功！",
        });
      } else {
        Modal.error({
          title: "失败!",
          content: "创建用户失败！",
        });
      }
    });
    // 创建的信息放在了首位，请求第一页表格的数据
    axios({
      method: "get",
      url: "/api/stu/list",
      params: {
        page: 1,
        pageSize: 5,
      },
    }).then(function (response) {
      setTotalM(response.data.total);
      setMessageList(response.data.list);
    });
    setOpen(false);
  };
  // 根据性别筛选学生信息,value即为输入的性别信息
  const onSelectBySex = (value: string) => {
    // 发送 get "/api/stu/sex" 请求
    axios({
      method: "get",
      url: "/api/stu/sex",
      params: {
        sex: value,
      },
    }).then(function (response) {
      // 返回的有查询得到的总个数以及学生信息表
      if (response.data.code == 0) {
        setTotal(response.data.total);
        setDisabledPage(true);
        setMessageList(response.data.stuMs);
      }
    });
  };
  // reSet重置事件,即恢复为筛选条件,注添加和删除操作不可逆
  const reSet = () => {
    window.location.reload();
  };
  return (
    <Layout className="site-layout">
      {/* 头部操作栏 */}
      <Header className="header">
        <Space>
          <Tooltip title="添加新成员">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className="add"
              onClick={() => {
                setOpen(true);
              }}
            />
          </Tooltip>
          <Select
            defaultValue="全部性别"
            style={{ width: 100 }}
            onChange={onSelectBySex}
            options={[
              {
                value: "男",
                label: "男",
              },
              {
                value: "女",
                label: "女",
              },
              {
                value: "未知",
                label: "未知",
              },
              {
                value: "全部性别",
                label: "全部性别",
              },
            ]}
          />
          <Search
            style={{ width: "100%" }}
            placeholder="请输入要查询的姓名"
            onSearch={onSearch}
            className="search"
          />
          <Button type="primary" onClick={reSet}>
            重置
          </Button>
        </Space>
      </Header>
      {/* 收集表单 */}
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {/* 主体内容 */}
      <Content
        className="site-layout-background"
        style={{
          margin: "12px 8px",
          padding: 12,
          minHeight: 280,
        }}
      >
        {/* 学生信息Table */}
        <MemberList
          messageList={messageList}
          setMessageList={setMessageList}
          total={total}
          setTotal={setTotal}
          totalM={totalM}
          setTotalM={setTotalM}
          disabledPage={disabledPage}
        ></MemberList>
      </Content>
    </Layout>
  );
};

export default MainContent;
